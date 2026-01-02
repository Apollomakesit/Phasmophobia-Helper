import { useState } from 'react';

const behaviorCategories = {
  'Hunt Behavior': [
    'Fast Hunter',
    'Slow Hunter',
    'Early Hunter',
    'Shy/Inactive',
  ],
  'Activity Level': [
    'Very Active',
    'Low Activity',
    'Throws Items',
  ],
  'Unique Behaviors': [
    'Multiple objects thrown',
    'Singing on parabolic mic',
    'Light manipulation',
    'Speed variations',
    'State changes',
    'Equipment interaction',
    'Movement-based speed',
  ],
};

function BehaviorFilters({ onFilterChange }) {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedBehaviors, setSelectedBehaviors] = useState({});

  const toggleBehavior = (behavior) => {
    const newSelected = { ...selectedBehaviors };
    newSelected[behavior] = !newSelected[behavior];
    setSelectedBehaviors(newSelected);
    onFilterChange(newSelected);
  };

  const clearAllFilters = () => {
    setSelectedBehaviors({});
    onFilterChange({});
  };

  const hasActiveFilters = Object.values(selectedBehaviors).some(v => v);

  return (
    <section className="behavior-filters" aria-label="Behavior filters">
      <div className="filter-header">
        <h3>🔍 Behavior Filters (Optional)</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="clear-filters-btn"
            aria-label="Clear all behavior filters"
          >
            Clear Filters
          </button>
        )}
      </div>

      {Object.entries(behaviorCategories).map(([category, behaviors]) => (
        <div key={category} className="filter-group">
          <h4>{category}</h4>
          <div className="filter-buttons">
            {behaviors.map((behavior) => (
              <button
                key={behavior}
                onClick={() => toggleBehavior(behavior)}
                className={`filter-btn ${selectedBehaviors[behavior] ? 'active' : ''}`}
                aria-pressed={selectedBehaviors[behavior]}
                aria-label={`${behavior} filter`}
              >
                {selectedBehaviors[behavior] && '✓ '}
                {behavior}
              </button>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default BehaviorFilters;
