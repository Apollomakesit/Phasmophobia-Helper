let selectedEvidence = [];
let difficulty = 'amateur';
function solve() {
  return GHOSTS.map(g => {
    let score = 0;
    selectedEvidence.forEach(e => {
      if(g.evidence.includes(e)) score += 2;
      if(g.cannotHave && g.cannotHave.includes(e)) score -= 5;
    });
    return {...g, score};
  }).sort((a,b) => b.score - a.score);
}