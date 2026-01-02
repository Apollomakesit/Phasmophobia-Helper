const Tools = (() => {
  const onryoCounter = (() => {
    let count = 0;
    return {
      increment() {
        count += 1;
        return count;
      },
      reset() {
        count = 0;
      },
      value() {
        return count;
      }
    };
  })();

  function bpmAnalyzer(bpm, ghost) {
    const value = Number(bpm);
    if (!value || value <= 0) return "Enter a valid BPM.";

    // Rough example ranges; tune to game info
    if (value < 100) return `${ghost.name}: Likely slow pattern.`;
    if (value < 130) return `${ghost.name}: Average hunt speed.`;
    return `${ghost.name}: Possibly fast or special ghost.`;
  }

  function smudgeTimer(type) {
    const now = new Date();
    let seconds = 180;

    if (type === "Demon") {
      seconds = 60;
    }

    const end = new Date(now.getTime() + seconds * 1000);
    const hh = String(end.getHours()).padStart(2, "0");
    const mm = String(end.getMinutes()).padStart(2, "0");
    const ss = String(end.getSeconds()).padStart(2, "0");

    return `Safe until ~${hh}:${mm}:${ss} (${seconds}s).`;
  }

  function mimicProbability(ghost) {
    // Placeholder logic; you can tie this to evidence
    return ghost.name === "Mimic" ? "Medium/High" : "Low/Medium";
  }

  return {
    bpmAnalyzer,
    smudgeTimer,
    onryoCounter,
    mimicProbability
  };
})();
