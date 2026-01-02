let selectedEvidence = [];
let difficulty = "amateur";

function solve() {
  if (!GHOSTS || !Array.isArray(GHOSTS)) {
    return [];
  }

  if (!selectedEvidence.length) {
    // Return copy in alphabetical order when nothing is selected
    return [...GHOSTS].sort((a, b) => a.name.localeCompare(b.name));
  }

  return GHOSTS.map((g) => {
    let score = 0;

    for (const e of selectedEvidence) {
      if (g.evidence.includes(e)) score += 2;
      if (g.cannotHave && g.cannotHave.includes(e)) score -= 5;
    }

    // Difficulty hook (ready to expand later)
    if (difficulty === "nightmare") {
      score += 0; // tweak if needed
    } else if (difficulty === "insanity") {
      score += 0;
    }

    return { ...g, score };
  }).sort((a, b) => b.score - a.score);
}
