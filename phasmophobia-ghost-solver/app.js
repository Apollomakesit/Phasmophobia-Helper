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

const modal = document.getElementById("ghost-modal");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.getElementById("close-modal");

// Difficulty radio buttons
document.querySelectorAll('input[name="difficulty"]').forEach((el) => {
  el.addEventListener("change", () => {
    difficulty = el.value;
    render();
  });
});

// Build evidence buttons
evidenceTypes.forEach((e) => {
  const div = document.createElement("div");
  div.className = "evidence";
  div.textContent = e;

  div.onclick = () => {
    const idx = selectedEvidence.indexOf(e);
    if (idx >= 0) {
      selectedEvidence.splice(idx, 1);
      div.classList.remove("active");
    } else {
      selectedEvidence.push(e);
      div.classList.add("active");
    }
    render();
  };

  evidencePanel.appendChild(div);
});

function render() {
  const solved = solve();

  ghostList.innerHTML = "";
  ranked.innerHTML = "";

  solved.forEach((g, i) => {
    const card = document.createElement("div");
    card.className = "ghost" + (g.score < 0 ? " greyed" : "");
    card.textContent = g.name;
    card.onclick = () => openModal(g);
    ghostList.appendChild(card);

    if (i < 3 && g.score > 0) {
      const li = document.createElement("li");
      li.textContent = g.name;
      ranked.appendChild(li);
    }
  });
}

function openModal(g) {
  modal.classList.remove("hidden");

  const traitsList = (g.traits || []).map((t) => `<li>${t}</li>`).join("");
  const testsList = (g.tests || []).map((t) => `<li>${t}</li>`).join("");
  const notIfList = (g.notIf || []).map((t) => `<li>${t}</li>`).join("");
  const alike = (g.alike || []).join(", ");

  modalBody.innerHTML = `
    <h3>${g.name}</h3>
    <p><strong>Evidence:</strong> ${g.evidence.join(", ")}</p>

    <p><strong>Unique Traits:</strong></p>
    <ul>${traitsList}</ul>

    <p><strong>☠️ Dead Giveaway:</strong> ${g.giveaway || "Unknown."}</p>

    <p><strong>🧪 Tests:</strong></p>
    <ul>${testsList}</ul>

    <p><strong>🚫 Not If:</strong></p>
    <ul>${notIfList}</ul>

    <p><strong>⚠️ Alike:</strong> ${alike || "None"}</p>
  `;
}

// Modal close behaviour
closeBtn.onclick = () => modal.classList.add("hidden");
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

// Tools wiring
document.getElementById("bpm-check").onclick = () => {
  const bpm = document.getElementById("bpm-input").value;
  const topGhost = selectedEvidence.length ? solve()[0] : { name: "Unknown" };
  document.getElementById("bpm-result").textContent = Tools.bpmAnalyzer(
    bpm,
    topGhost
  );
};

document.getElementById("smudge-start").onclick = () => {
  const type = document.getElementById("smudge-select").value;
  document.getElementById("smudge-result").textContent = Tools.smudgeTimer(
    type
  );
};

document.getElementById("onryo-add").onclick = () => {
  document.getElementById("onryo-count").textContent =
    Tools.onryoCounter.increment();
};

document.getElementById("onryo-reset").onclick = () => {
  Tools.onryoCounter.reset();
  document.getElementById("onryo-count").textContent = 0;
};

document.getElementById("mimic-result").textContent = Tools.mimicProbability({
  name: "Mimic"
});

// Initial render
render();
