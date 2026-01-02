import { useState } from 'react';

function GhostCard({ ghost, showDetails, selectedEvidence }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const ghostEmojis = {
    'Spirit': '👻',
    'Wraith': '👤',
    'Phantom': '🌫️',
    'Poltergeist': '💥',
    'Banshee': '😱',
    'Jinn': '🌪️',
    'Mare': '😴',
    'Revenant': '🧟',
    'Shade': '🕷️',
    'Demon': '😈',
    'Yurei': '🪬',
    'Oni': '🔥',
    'Yokai': '🎃',
    'Hantu': '❄️',
    'Goryo': '⛩️',
    'Myling': '🔊',
    'Onryo': '🌊',
    'The Twins': '👯',
    'Raiju': '⚡',
    'Obake': '🧬',
    'The Mimic': '🎭',
    'Moroi': '🧛',
    'Deogen': '👁️',
    'Thaye': '👴',
    'Obambo': '⏰',
    'Gallu': '🔋',
    'Dayan': '💃',
  };

  const emoji = ghostEmojis[ghost.name] || '👻';
  const isHighLikelihood = ghost.probability >= 80;
  
  const toggleDetails = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`ghost-card ${isHighLikelihood ? 'high-likelihood' : ''}`}
      onClick={toggleDetails}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleDetails();
        }
      }}
      aria-expanded={showDetails && isExpanded}
    >
      {/* Ghost Title Section */}
      <div className="ghost-title">
        <span className="ghost-emoji" aria-hidden="true">
          {emoji}
        </span>
        <span className="ghost-name">{ghost.name}</span>
        {isHighLikelihood && (
          <span className="badge guaranteed" aria-label="High likelihood candidate">
            🎯 Top Match
          </span>
        )}
      </div>

      {/* Probability Display */}
      <div className="probability-display">
        <span className="probability-percent" aria-label={`${ghost.probability} percent probability`}>
          {ghost.probability}%
        </span>
        <div className="probability-bar">
          <div
            className="probability-fill"
            style={{ width: `${ghost.probability}%` }}
            role="progressbar"
            aria-valuenow={ghost.probability}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {ghost.probability >= 20 && <span>{ghost.probability}%</span>}
          </div>
        </div>
      </div>

      {/* Evidence Badges */}
      <div className="badge-row">
        {ghost.evidence.map((evidence) => (
          <span
            key={evidence}
            className={`badge ${selectedEvidence.includes(evidence) ? 'guaranteed' : ''}`}
          >
            {evidence}
          </span>
        ))}
      </div>

      {/* Match Indicator */}
      {ghost.reasonsForMatch && ghost.reasonsForMatch.length > 0 && (
        <div className="match-indicator">
          {ghost.reasonsForMatch.join(' • ')}
        </div>
      )}

      {/* Expandable Details Section */}
      {showDetails && (
        <div className={`details-section ${isExpanded ? 'expanded' : ''}`}>
          {/* Basic Info */}
          <div className="detail-row">
            <span className="detail-icon" aria-hidden="true">
              📊
            </span>
            <div className="detail-content">
              <h4>Hunt Threshold</h4>
              <p>{ghost.huntThreshold}% sanity</p>
            </div>
          </div>

          {/* Speed Info */}
          <div className="detail-row">
            <span className="detail-icon" aria-hidden="true">
              ⚡
            </span>
            <div className="detail-content">
              <h4>Base Speed</h4>
              <p>{ghost.speed} m/s</p>
              {ghost.speedVariations && (
                <p style={{ fontSize: '0.85em', marginTop: '0.25rem' }}>
                  {ghost.speedVariations}
                </p>
              )}
            </div>
          </div>

          {/* Behaviors */}
          {ghost.behaviors && ghost.behaviors.length > 0 && (
            <div className="detail-row highlight">
              <span className="detail-icon" aria-hidden="true">
                🎭
              </span>
              <div className="detail-content">
                <h4>Behaviors & Abilities</h4>
                <ul>
                  {ghost.behaviors.map((behavior, index) => (
                    <li key={index}>{behavior}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Key Giveaways */}
          {ghost.keyGiveaways && ghost.keyGiveaways.length > 0 && (
            <div className="detail-row">
              <span className="detail-icon" aria-hidden="true">
                🔍
              </span>
              <div className="detail-content">
                <h4>Key Identification Giveaways</h4>
                <ul>
                  {ghost.keyGiveaways.map((giveaway, index) => (
                    <li key={index}>{giveaway}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Description */}
          {ghost.description && (
            <div className="detail-row">
              <span className="detail-icon" aria-hidden="true">
                📖
              </span>
              <div className="detail-content">
                <h4>Description</h4>
                <p>{ghost.description}</p>
              </div>
            </div>
          )}

          {/* Special Abilities for New Ghosts */}
          {ghost.specialAbility && (
            <div className="detail-row highlight">
              <span className="detail-icon" aria-hidden="true">
                ✨
              </span>
              <div className="detail-content">
                <h4>Special Ability</h4>
                <p>{ghost.specialAbility}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GhostCard;
