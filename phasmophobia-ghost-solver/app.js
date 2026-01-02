const evidenceTypes = [
  "EMF 5",
  "DOTS",
  "Freezing",
  "Spirit Box",
  "UV",
  "Ghost Orbs",
  "Ghost Writing"
];

const evidencePanel = document.getElementById("evidence-panel");
const ghostList = document.getElementById("ghost-list");
const ranked = document.getElementById("ranked-ghosts");
const details = document.getElementById("ghost-details");

let selectedEvidence = [];
let excludedEvidence = [];
let difficulty = "amateur";
let currentBpm = null;

// Difficulty radio buttons
document.querySelectorAll('input[name="difficulty"]').forEach((el) => {
  el.addEventListener("change", () => {
    difficulty = el.value;
    render();
  });
});

// Build evidence buttons with exclude (right‑click)
evidenceTypes.forEach((e) => {
  const div = document.createElement("div");
  div.className = "evidence";
  div.textContent = e;

  div.addEventListener("click", (ev) => {
    ev.preventDefault();
    // normal left click = select/unselect
    const idx = selectedEvidence.indexOf(e);
    if (idx >= 0) {
      selectedEvidence.splice(idx, 1);
      div.classList.remove("active");
    } else {
      selectedEvidence.push(e);
      div.classList.add("active");
      // ensure not excluded
      const exIdx = excludedEvidence.indexOf(e);
      if (exIdx >= 0) {
        excludedEvidence.splice(exIdx, 1);
      }
      div.classList.remove("excluded");
    }
    render();
  });

  div.addEventListener("contextmenu", (ev) => {
    ev.preventDefault();
    // right click = exclude toggle
    const exIdx = excludedEvidence.indexOf(e);
    if (exIdx >= 0) {
      excludedEvidence.splice(exIdx, 1);
      div.classList.remove("excluded");
    } else {
      excludedEvidence.push(e);
      div.classList.add("excluded");
      // if it was selected, unselect
      const idx = selectedEvidence.indexOf(e);
      if (idx >= 0) {
        selectedEvidence.splice(idx, 1);
      }
      div.classList.remove("active");
    }
    render();
  });

  evidencePanel.appendChild(div);
});

// Helper: BPM score vs ghost bpmRange
function bpmCompatibilityScore(ghost, bpm) {
  if (!bpm || !ghost.bpmRange) return 0;
  const [min, max] = ghost.bpmRange;
  if (bpm >= min && bpm <= max) {
    return 6; // strong bonus for fit
  }
  // softer falloff if close
  const center = (min + max) / 2;
  const diff = Math.abs(bpm - center);
  if (diff < 10) return 3;
  if (diff < 20) return 1;
  return -2; // penalize if clearly outside
}

// Core solve wrapper adding BPM + excluded evidence logic
function solveWithExtras() {
  const baseSolved = solve(selectedEvidence, difficulty); // assumes solver.js exports this signature
  // filter / adjust based on excluded evidence and bpm
  const adjusted = baseSolved
    .map((g) => {
      // big penalty if it has excluded evidence
      const hasExcluded = (g.evidence || []).some((ev) =>
        excludedEvidence.includes(ev)
      );
      let score = g.score;
      if (hasExcluded) {
        score -= 50;
      }

      // add BPM component
      score += bpmCompatibilityScore(g, currentBpm);

      return {
        ...g,
        score
      };
    })
    .sort((a, b) => b.score - a.score);

  return adjusted;
}

function renderGhostDetails(g) {
  const traitsList = (g.traits || [])
    .map((t) => `<li>${t}</li>`)
    .join("");
  const testsList = (g.tests || [])
    .map((t) => `<li>${t}</li>`)
    .join("");
  const notIfList = (g.notIf || [])
    .map((t) => `<li>${t}</li>`)
    .join("");
  const alike = (g.alike || []).join(", ") || "None";

  const speed = g.speedLabel || "Unknown speed";
  const bpmText = g.bpmRange
    ? `${g.bpmRange[0]}–${g.bpmRange[1]} BPM`
    : "Unknown BPM";

  details.innerHTML = `
    <h3>${g.name}</h3>
    <p><strong>Speed:</strong> ${speed}</p>
    <p><strong>Footstep BPM:</strong> ${bpmText}</p>
    <p><strong>Evidence:</strong> ${g.evidence.join(", ")}</p>
    <h4>Unique Traits</h4>
    <ul>${traitsList}</ul>
    <h4>☠️ Dead Giveaway</h4>
    <p>${g.giveaway || "Unknown."}</p>
    <h4>🧪 Tests</h4>
    <ul>${testsList}</ul>
    <h4>🚫 Not If</h4>
    <ul>${notIfList}</ul>
    <h4>⚠️ Alike</h4>
    <p>${alike}</p>
  `;
}

function render() {
  const solved = solveWithExtras();

  ghostList.innerHTML = "";
  ranked.innerHTML = "";

  const positive = solved.filter((g) => g.score > 0);
  const totalPositiveScore = positive.reduce(
    (sum, g) => sum + g.score,
    0
  );

  const best =
    positive.length > 0 &&
    selectedEvidence.length >= 1
      ? positive[0]
      : null;

  solved.forEach((g) => {
    const card = document.createElement("div");
    let cls = "ghost";
    if (g.score < 0) cls += " greyed";
    if (best && g.name === best.name && selectedEvidence.length === 3) {
      cls += " best";
    }
    card.className = cls;

    const pct =
      g.score > 0 && totalPositiveScore
        ? Math.round((100 * g.score) / totalPositiveScore)
        : 0;

    const speed = g.speedLabel || "Unknown speed";
    const bpmText = g.bpmRange
      ? `${g.bpmRange[0]}–${g.bpmRange[1]} BPM`
      : "Unknown BPM";

    card.innerHTML = `
      <div class="ghost-name">
        ${g.name}${pct > 0 ? ` (${pct}% )` : ""}
      </div>
      <div class="ghost-speed">
        <small>${speed} – ${bpmText}</small>
      </div>
    `;

    card.onclick = () => renderGhostDetails(g);
    ghostList.appendChild(card);
  });

  // Top 3
  positive.slice(0, 3).forEach((g) => {
    const pct =
      totalPositiveScore > 0
        ? Math.round((100 * g.score) / totalPositiveScore)
        : 0;
    const li = document.createElement("li");
    li.textContent = `${g.name} - ${pct}%`;
    ranked.appendChild(li);
  });

  // Update Mimic probability display using new context
  document.getElementById("mimic-result").textContent =
    Tools.mimicProbability({
      name: "Mimic",
      selectedEvidence,
      difficulty,
      currentBpm
    });
}

// Tools wiring

document.getElementById("bpm-check").onclick = () => {
  const val = Number(document.getElementById("bpm-input").value);
  if (!val || val <= 0) {
    currentBpm = null;
    document.getElementById("bpm-result").textContent =
      "Enter a valid BPM to use it for ghost speed matching.";
    render();
    return;
  }
  currentBpm = val;

  // Use Tools.bpmAnalyzer for a descriptive line + re-render
  const topGhost = selectedEvidence.length ? solveWithExtras()[0] : { name: "Unknown" };
  const analysis = Tools.bpmAnalyzer(val, topGhost);
  document.getElementById("bpm-result").textContent = analysis;
  render();
};

document.getElementById("smudge-start").onclick = () => {
  const type = document.getElementById("smudge-select").value;
  document.getElementById("smudge-result").textContent =
    Tools.smudgeTimer(type);
};

document.getElementById("onryo-add").onclick = () => {
  document.getElementById("onryo-count").textContent =
    Tools.onryoCounter.increment();
};

document.getElementById("onryo-reset").onclick = () => {
  Tools.onryoCounter.reset();
  document.getElementById("onryo-count").textContent = 0;
};

document.getElementById("tools-help").onclick = () => {
  document
    .getElementById("tools-help-text")
    .classList.toggle("hidden");
};

// Initial render
render();
