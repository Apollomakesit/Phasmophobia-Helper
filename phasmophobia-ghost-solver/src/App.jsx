import { useState, useMemo } from 'react';
import { ghosts } from './data/ghosts';
import { evidenceTypes } from './data/evidence';
import './App.css';

function App() {
  const [selectedEvidence, setSelectedEvidence] = useState([]);
  const [excludedEvidence, setExcludedEvidence] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  const handleEvidenceClick = (evidence) => {
    if (selectedEvidence.includes(evidence)) {
      setSelectedEvidence(prev => prev.filter(e => e !== evidence));
      setExcludedEvidence(prev => [...prev, evidence]);
    } else if (excludedEvidence.includes(evidence)) {
      setExcludedEvidence(prev => prev.filter(e => e !== evidence));
    } else {
      setSelectedEvidence(prev => [...prev, evidence]);
    }
  };

  const filteredGhosts = useMemo(() => {
    return ghosts.map(ghost => {
      const matchingEvidence = selectedEvidence.filter(ev => 
        ghost.evidence.includes(ev)
      ).length;
      
      const hasExcluded = excludedEvidence.some(ev => 
        ghost.evidence.includes(ev)
      );

      const probability = hasExcluded ? 0 : 
        selectedEvidence.length === 0 ? 100 / ghosts.length :
        (matchingEvidence / selectedEvidence.length) * 100;

      return { ...ghost, probability, matchingEvidence };
    })
    .filter(g => g.probability > 0)
    .sort((a, b) => b.probability - a.probability);
  }, [selectedEvidence, excludedEvidence]);

  return (
    <div className="app">
      <header className="header">
        <h1>👻 Phasmophobia Ghost Identifier</h1>
        <p>Select evidence to narrow down the ghost</p>
      </header>

      <section className="evidence-selector">
        {evidenceTypes.map(({ name, icon }) => {
          const isSelected = selectedEvidence.includes(name);
          const isExcluded = excludedEvidence.includes(name);
          return (
            <button
              key={name}
              onClick={() => handleEvidenceClick(name)}
              className={`evidence-btn ${isSelected ? 'selected' : ''} ${isExcluded ? 'excluded' : ''}`}
            >
              <span className="icon">{icon}</span>
              <span className="name">{name}</span>
            </button>
          );
        })}
      </section>

      <div className="controls">
        <button onClick={() => setShowDetails(!showDetails)} className="toggle-btn">
          {showDetails ? 'Hide' : 'Show'} Behaviors & Giveaways
        </button>
        <button onClick={() => { setSelectedEvidence([]); setExcludedEvidence([]); }} className="reset-btn">
          Reset All
        </button>
      </div>

      <section className="ghost-list">
        <h2>Possible Ghosts ({filteredGhosts.length})</h2>
        {filteredGhosts.map(ghost => (
          <div key={ghost.name} className="ghost-card" style={{"--probability": ghost.probability}}>
            <div className="ghost-header">
              <h3>{ghost.name}</h3>
              <div className="probability">{Math.round(ghost.probability)}%</div>
            </div>
            <div className="evidence-list">
              {ghost.evidence.map(ev => (
                <span key={ev} className={`evidence-tag ${selectedEvidence.includes(ev) ? 'matched' : ''}`}>
                  {ev}
                </span>
              ))}
              {ghost.bonusEvidence && (
                <span className="evidence-tag bonus">{ghost.bonusEvidence}</span>
              )}
            </div>
            {showDetails && (
              <div className="ghost-details">
                <p><strong>💪 Strength:</strong> {ghost.strength}</p>
                <p><strong>🛡️ Weakness:</strong> {ghost.weakness}</p>
                <p><strong>🎭 Behaviors:</strong> {ghost.behaviors.join(', ')}</p>
                <p><strong>🔍 Key Giveaways:</strong> {ghost.giveaways.join(', ')}</p>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
