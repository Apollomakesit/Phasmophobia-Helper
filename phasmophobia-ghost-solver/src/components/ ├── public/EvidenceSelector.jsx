import { evidenceTypes } from '../data/evidence';

function EvidenceSelector({ selectedEvidence, excludedEvidence, onEvidenceClick }) {
  const getEvidenceState = (evidence) => {
    if (selectedEvidence.includes(evidence)) return 'selected';
    if (excludedEvidence.includes(evidence)) return 'excluded';
    return 'unselected';
  };

  return (
    <section className="evidence-selector">
      {evidenceTypes.map(({ name, icon }) => {
        const state = getEvidenceState(name);
        return (
          <button
            key={name}
            onClick={() => onEvidenceClick(name)}
            className={`evidence-btn ${state}`}
            aria-label={`${name} - ${state}`}
          >
            <span className="icon">{icon}</span>
            <span className="name">{name}</span>
            <span className="state-indicator">
              {state === 'selected' && '✓'}
              {state === 'excluded' && '✗'}
            </span>
          </button>
        );
      })}
      <div className="evidence-legend">
        <span className="legend-item">
          <span className="legend-color selected">█</span> Confirmed
        </span>
        <span className="legend-item">
          <span className="legend-color excluded">█</span> Ruled Out
        </span>
        <span className="legend-item">
          <span className="legend-color unselected">█</span> Unknown
        </span>
      </div>
    </section>
  );
}

export default EvidenceSelector;
