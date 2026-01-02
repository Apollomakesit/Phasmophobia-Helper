// Minimal example data; extend with full info per ghost
const GHOSTS = [
  {
    name: "Spirit",
    evidence: ["EMF 5", "Spirit Box", "Ghost Writing"],
    cannotHave: ["Freezing", "DOTS", "Ghost Orbs", "UV"],
    traits: [
      "Standard hunt behaviour",
      "Smudge sticks block hunts for 180s"
    ],
    giveaway: "Most generic behaviour; use smudge timing to isolate.",
    tests: [
      "Track hunt intervals with smudge",
      "Compare with similar EMF/Box/Writing ghosts"
    ],
    notIf: ["Consistent speed changes", "Strong light preference"],
    alike: ["Wraith", "Myling"]
  },
  {
    name: "Wraith",
    evidence: ["EMF 5", "Spirit Box", "DOTS"],
    cannotHave: ["Freezing", "Ghost Writing"],
    traits: [
      "Can teleport to players",
      "Footsteps do not leave UV footprints after salt"
    ],
    giveaway: "Stepping in salt without UV footprints.",
    tests: [
      "Place salt then check with UV",
      "Listen for teleport behaviour"
    ],
    notIf: ["Leaves UV footprints in salt"],
    alike: ["Spirit", "Phantom"]
  }
  // Add all remaining ghosts here
];
