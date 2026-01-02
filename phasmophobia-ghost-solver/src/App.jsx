import { useState, useMemo } from 'react';
import { ghosts } from './data/ghosts';
import EvidenceSelector from './components/EvidenceSelector';
import GhostList from './components/GhostList';
import BehaviorFilters from './components/BehaviorFilters';
import './App.css';

function App() {
  const [selectedEvidence, setSelectedEvidence] = useState([]);
  const [excludedEvidence, setExcludedEvidence] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [behaviorFilters, setBehaviorFilters] = useState({});

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

  const handleReset = () => {
    setSelectedEvidence([]);
    setExcludedEvidence([]);
    setBehaviorFilters({});
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
        <p className="subtitle">The Ultimate Ghost Hunting Tool</p>
        <div className="instructions">
          Click once to <span className="badge-green">confirm</span> evidence, 
          twice to <span className="badge-red">rule out</span>, 
          three times to reset
        </div>
      </header>

      <EvidenceSelector
        selectedEvidence={selectedEvidence}
        excludedEvidence={excludedEvidence}
        onEvidenceClick={handleEvidenceClick}
      />

      <BehaviorFilters onFilterChange={setBehaviorFilters} />

      <div className="controls">
        <button onClick={() => setShowDetails(!showDetails)} className="toggle-btn">
          {showDetails ? '🔼 Hide' : '🔽 Show'} Detailed Behaviors
        </button>
        <button onClick={handleReset} className="reset-btn">
          🔄 Reset All
        </button>
        <div className="result-count">
          Showing {filteredGhosts.length} of {ghosts.length} ghosts
        </div>
      </div>

      <GhostList 
        ghosts={filteredGhosts} 
        showDetails={showDetails}
        selectedEvidence={selectedEvidence}
      />

      <footer className="footer">
        <p>Updated for Phasmophobia v0.10+ (January 2026)</p>
        <p>Includes Dayan, Gallu, and Obambo ghosts</p>
      </footer>
    </div>
  );
}

export default App;
