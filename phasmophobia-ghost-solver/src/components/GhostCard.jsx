function GhostCard({ ghost, showDetails, selectedEvidence }) {
  const probabilityColor = ghost.probability >= 80 ? '#51cf66' : 
                          ghost.probability >= 50 ? '#ffd43b' : 
                          ghost.probability >= 25 ? '#ff922b' : '#ff6b6b';

  return (
    <div 
      className="ghost-card" 
      style={{
        '--probability': ghost.probability,
        '--prob-color': probabilityColor
      }}
    >
      <div className="ghost-header">
        <div className="ghost-title">
          <h3>{ghost.name}</h3>
          {ghost.guaranteedEvidence && (
            <span className="guaranteed-badge" title="This ghost always has this evidence">
              🔒 {ghost.guaranteedEvidence}
            </span>
          )}
        </div>
        <div className="probability" style={{ color: probabilityColor }}>
          {Math.round(ghost.probability)}%
        </div>
      </div>

      <div className="evidence-list">
        {ghost.evidence.map(ev => (
          <span 
            key={ev} 
            className={`evidence-tag ${selectedEvidence.includes(ev) ? 'matched' : ''}`}
          >
            {ev}
          </span>
        ))}
        {ghost.bonusEvidence && (
          <span className="evidence-tag bonus" title="Always present as 4th evidence">
            ⭐ {ghost.bonusEvidence}
          </span>
        )}
      </div>

      <div className="match-indicator">
        <span className="match-text">
          {ghost.matchingEvidence} / {selectedEvidence.length} evidence matched
        </span>
      </div>

      {showDetails && (
        <div className="ghost-details">
          <div className="detail-row">
            <span className="detail-icon">💪</span>
            <div>
              <strong>Strength:</strong> {ghost.strength}
            </div>
          </div>
          <div className="detail-row">
            <span className="detail-icon">🛡️</span>
            <div>
              <strong>Weakness:</strong> {ghost.weakness}
            </div>
          </div>
          <div className="detail-row">
            <span className="detail-icon">🎭</span>
            <div>
              <strong>Behaviors:</strong>
              <ul>
                {ghost.behaviors.map((behavior, i) => (
                  <li key={i}>{behavior}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="detail-row highlight">
            <span className="detail-icon">🔍</span>
            <div>
              <strong>Key Giveaways:</strong>
              <ul>
                {ghost.giveaways.map((giveaway, i) => (
                  <li key={i}>{giveaway}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GhostCard;
