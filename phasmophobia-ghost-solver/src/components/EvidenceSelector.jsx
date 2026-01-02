import { evidenceTypes } from '../data/evidence';

function EvidenceSelector({ selectedEvidence, excludedEvidence, onEvidenceClick }) {
  const getEvidenceState = (evidence) => {
    if (selectedEvidence.includes(evidence)) return 'selected';
    if (excludedEvidence.includes(evidence)) return 'excluded';
    return 'unselected';
  };

  return (
    <section className="evidence-selector" aria-label="Evidence selection">
      {evidenceTypes.map(({ name, icon }) => {
        const state = getEvidenceState(name);
        return (
          <button
            key={name}
            onClick={() => onEvidenceClick(name)}
            className={`evidence-btn ${state}`}
            aria-label={`${name} evidence - currently ${
              state === 'selected'
                ? 'confirmed'
                : state === 'excluded'
                ? 'ruled out'
                : 'not selected'
            }. Click to ${
              state === 'selected'
                ? 'rule out'
                : state === 'excluded'
                ? 'reset'
                : 'confirm'
            }`}
            aria-pressed={state === 'selected'}
            role="button"
            tabIndex={0}
            title={`${name}: ${
              state === 'selected'
                ? 'Confirmed ✓'
                : state === 'excluded'
                ? 'Ruled Out ✗'
                : 'Unknown'
            }`}
          >
            <span className="icon" aria-hidden="true">
              {icon}
            </span>
            <span className="name">{name}</span>
            <span className="state-indicator" aria-hidden="true">
              {state === 'selected' && '✓'}
              {state === 'excluded' && '✗'}
            </span>
          </button>
        );
      })}

      <div className="evidence-legend">
        <span className="legend-item">
          <span className="legend-color selected">█</span>
          <span>Confirmed</span>
        </span>
        <span className="legend-item">
          <span className="legend-color excluded">█</span>
          <span>Ruled Out</span>
        </span>
        <span className="legend-item">
          <span className="legend-color unselected">█</span>
          <span>Unknown</span>
        </span>
      </div>
    </section>
  );
}

export default EvidenceSelector;
