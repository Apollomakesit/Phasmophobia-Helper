const Tools = {
  bpmAnalyzer: function(bpm, ghost) { return `${ghost.name} footstep speed check: ${bpm} BPM`; },
  smudgeTimer: function(ghostType) { const time = ghostType === 'Demon' ? 60 : 180; return `Smudge burn time for ${ghostType}: ${time}s`; },
  onryoCounter: { count: 0, increment: function() { this.count++; return this.count; }, reset: function(){ this.count=0; } },
  mimicProbability: function(ghost){ return ghost.name === 'Mimic' ? 'High probability' : 'Low/Medium'; }
};