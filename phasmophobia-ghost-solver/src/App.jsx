import { useState, useMemo, useEffect } from 'react';
import { ghosts } from './data/ghosts';
import EvidenceSelector from './components/EvidenceSelector';
import GhostList from './components/GhostList';
import BehaviorFilters from './components/BehaviorFilters';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

function App() {
  // State Management with localStorage persistence
  const [selectedEvidence, setSelectedEvidence] = useState(() => {
    try {
      const saved = localStorage.getItem('selectedEvidence');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [excludedEvidence, setExcludedEvidence] = useState(() => {
    try {
      const saved = localStorage.getItem('excludedEvidence');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [showDetails, setShowDetails] = useState(false);
  const [behaviorFilters, setBehaviorFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem('selectedEvidence', JSON.stringify(selectedEvidence));
  }, [selectedEvidence]);

  useEffect(() => {
    localStorage.setItem('excludedEvidence', JSON.stringify(excludedEvidence));
  }, [excludedEvidence]);

  // Enhanced Evidence Click Handler (3-state: unselected → confirmed → excluded → unselected)
  const handleEvidenceClick = (evidence) => {
    if (selectedEvidence.includes(evidence)) {
      // Move from confirmed to excluded
      setSelectedEvidence(prev => prev.filter(e => e !== evidence));
      setExcludedEvidence(prev => [...prev, evidence]);
    } else if (excludedEvidence.includes(evidence)) {
      // Move from excluded to unselected
      setExcludedEvidence(prev => prev.filter(e => e !== evidence));
    } else {
      // Move from unselected to confirmed
      setSelectedEvidence(prev => [...prev, evidence]);
    }
  };

  // Reset all selections
  const handleReset = () => {
    setSelectedEvidence([]);
    setExcludedEvidence([]);
    setBehaviorFilters({});
    localStorage.removeItem('selectedEvidence');
    localStorage.removeItem('excludedEvidence');
  };

  // Enhanced Probability Calculation with weighted factors
  const filteredGhosts = useMemo(() => {
    if (isLoading) return [];

    return ghosts
      .map(ghost => {
        let probability = 50; // Base probability
        let matchingEvidence = 0;
        let reasonsForMatch = [];

        // Check for excluded evidence - if any match, eliminate ghost
        const hasExcludedEvidence = excludedEvidence.some(ev =>
          ghost.evidence.includes(ev)
        );

        if (hasExcludedEvidence) {
          return { ...ghost, probability: 0, matchingEvidence: 0, reasonsForMatch: [] };
        }

        // Calculate evidence matching (heavily weighted)
        if (selectedEvidence.length > 0) {
          matchingEvidence = selectedEvidence.filter(ev =>
            ghost.evidence.includes(ev)
          ).length;

          // If selected evidence length > 0, must match at least one
          if (matchingEvidence === 0) {
            return { ...ghost, probability: 0, matchingEvidence: 0, reasonsForMatch: [] };
          }

          // Evidence matching weight: 40%
          probability = (matchingEvidence / selectedEvidence.length) * 100;

          if (matchingEvidence === selectedEvidence.length) {
            reasonsForMatch.push('All evidence matches');
          } else {
            reasonsForMatch.push(`${matchingEvidence}/${selectedEvidence.length} evidence matches`);
          }
        }

        // Apply behavior filter bonuses (+15% each behavior match)
        if (Object.keys(behaviorFilters).length > 0) {
          let behaviorMatches = 0;
          for (const [behavior, isSelected] of Object.entries(behaviorFilters)) {
            if (isSelected && ghost.behaviors && ghost.behaviors.includes(behavior)) {
              behaviorMatches++;
            }
          }

          if (behaviorMatches > 0) {
            probability = Math.min(100, probability + (behaviorMatches * 12));
            reasonsForMatch.push(`${behaviorMatches} behavior(s) match`);
          }
        }

        // Special bonus for exact evidence count match (Mimic can have 4)
        if (selectedEvidence.length > 0 && selectedEvidence.length === ghost.evidence.length) {
          probability = Math.min(100, probability + 5);
        }

        // Difficulty mode adjustment
        if (selectedEvidence.length >= 3) {
          probability = Math.min(100, probability + 5);
          reasonsForMatch.push('Solid evidence count');
        }

        return {
          ...ghost,
          probability: Math.round(probability),
          matchingEvidence,
          reasonsForMatch
        };
      })
      .filter(g => g.probability > 0)
      .sort((a, b) => b.probability - a.probability);
  }, [selectedEvidence, excludedEvidence, behaviorFilters, isLoading]);

  // Simulate loading for dramatic effect
  useEffect(() => {
    if (selectedEvidence.length > 0 || Object.keys(behaviorFilters).length > 0) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [selectedEvidence, behaviorFilters]);

  return (
    <div className="app">
      <header className="header">
        <h1>👻 Phasmophobia Ghost Identifier</h1>
        <p className="subtitle">The Ultimate Ghost Hunting Tool</p>
        <div className="instructions">
          Click once to <span className="badge-green">confirm</span> evidence,
          <br />
          click again to <span className="badge-red">rule out</span>,
          <br />
          click a third time to reset
        </div>
      </header>

      <EvidenceSelector
        selectedEvidence={selectedEvidence}
        excludedEvidence={excludedEvidence}
        onEvidenceClick={handleEvidenceClick}
      />

      <BehaviorFilters onFilterChange={setBehaviorFilters} />

      <div className="controls">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="toggle-btn"
          aria-expanded={showDetails}
        >
          {showDetails ? '🔼 Hide' : '🔽 Show'} Detailed Info
        </button>
        <button onClick={handleReset} className="reset-btn">
          🔄 Reset All
        </button>
        <div className="result-count">
          {isLoading ? (
            'Analyzing...'
          ) : (
            <>Showing {filteredGhosts.length} of {ghosts.length} ghosts</>
          )}
        </div>
      </div>

      {isLoading && <LoadingSpinner />}

      <GhostList
        ghosts={filteredGhosts}
        showDetails={showDetails}
        selectedEvidence={selectedEvidence}
      />

      <footer className="footer">
        <p>🎮 Updated for Phasmophobia v0.10+ (January 2026)</p>
        <p>Includes Dayan, Gallu, and Obambo ghosts from Winter's Jest 2025 update</p>
        <p>Not affiliated with Kinetic Games • Made by the community</p>
      </footer>
    </div>
  );
}

export default App;
