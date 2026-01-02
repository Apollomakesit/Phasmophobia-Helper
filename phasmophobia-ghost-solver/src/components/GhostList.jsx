import GhostCard from './GhostCard';

function GhostList({ ghosts, showDetails, selectedEvidence }) {
  if (ghosts.length === 0) {
    return (
      <section className="ghost-list">
        <div className="no-results">
          <h2>🤔 No Ghosts Match Your Criteria</h2>
          <p>Try adjusting your evidence selection or clearing some filters.</p>
          <p>Make sure you've selected at least one piece of evidence to begin hunting!</p>
        </div>
      </section>
    );
  }

  const topGhost = ghosts[0];
  const isTopGhostVeryLikely = topGhost.probability >= 90;

  return (
    <section className="ghost-list">
      <div className="list-header">
        <h2>🎯 Possible Ghosts ({ghosts.length})</h2>
        {isTopGhostVeryLikely && (
          <div className="strong-candidate-alert">
            <strong>{topGhost.name}</strong> is the most likely candidate at{' '}
            <strong>{topGhost.probability}%</strong>
          </div>
        )}
      </div>

      {ghosts.map((ghost) => (
        <GhostCard
          key={ghost.name}
          ghost={ghost}
          showDetails={showDetails}
          selectedEvidence={selectedEvidence}
        />
      ))}
    </section>
  );
}

export default GhostList;
