import GhostCard from './GhostCard';

function GhostList({ ghosts, showDetails, selectedEvidence }) {
  if (ghosts.length === 0) {
    return (
      <section className="ghost-list">
        <div className="no-results">
          <h2>👻 No Ghosts Match This Evidence</h2>
          <p>Try excluding some evidence instead of confirming it, or reset your selections.</p>
        </div>
      </section>
    );
  }

  const topCandidate = ghosts[0];
  const hasStrongCandidate = topCandidate.probability >= 75;

  return (
    <section className="ghost-list">
      <div className="list-header">
        <h2>Possible Ghosts ({ghosts.length})</h2>
        {hasStrongCandidate && (
          <div className="strong-candidate-alert">
            <span className="alert-icon">⚠️</span>
            <strong>{topCandidate.name}</strong> is the most likely candidate ({Math.round(topCandidate.probability)}%)
          </div>
        )}
      </div>
      
      <div className="ghost-grid">
        {ghosts.map(ghost => (
          <GhostCard 
            key={ghost.name} 
            ghost={ghost} 
            showDetails={showDetails}
            selectedEvidence={selectedEvidence}
          />
        ))}
      </div>
    </section>
  );
}

export default GhostList;
