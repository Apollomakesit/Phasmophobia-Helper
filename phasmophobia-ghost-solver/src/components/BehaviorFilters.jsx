import { useState } from 'react';

function BehaviorFilters({ onFilterChange }) {
  const [activeFilters, setActiveFilters] = useState({
    huntBehavior: null,
    activity: null,
    sanityThreshold: null
  });

  const behaviorOptions = [
    { id: 'fast', label: 'Fast Hunter', icon: '⚡' },
    { id: 'slow', label: 'Slow Hunter', icon: '🐢' },
    { id: 'early', label: 'Early Hunter', icon: '🚨' },
    { id: 'shy', label: 'Shy/Inactive', icon: '🙈' },
  ];

  const activityOptions = [
    { id: 'high', label: 'Very Active', icon: '🔥' },
    { id: 'low', label: 'Low Activity', icon: '💤' },
    { id: 'items', label: 'Throws Items', icon: '📦' },
  ];

  const handleFilterToggle = (category, value) => {
    setActiveFilters(prev => {
      const newFilters = {
        ...prev,
        [category]: prev[category] === value ? null : value
      };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const resetFilters = () => {
    setActiveFilters({
      huntBehavior: null,
      activity: null,
      sanityThreshold: null
    });
    onFilterChange({
      huntBehavior: null,
      activity: null,
      sanityThreshold: null
    });
  };

  return (
    <section className="behavior-filters">
      <div className="filter-header">
        <h3>🎯 Behavior Filters (Optional)</h3>
        {Object.values(activeFilters).some(v => v !== null) && (
          <button onClick={resetFilters} className="clear-filters-btn">
            Clear Filters
          </button>
        )}
      </div>

      <div className="filter-group">
        <h4>Hunt Behavior</h4>
        <div className="filter-buttons">
          {behaviorOptions.map(option => (
            <button
              key={option.id}
              onClick={() => handleFilterToggle('huntBehavior', option.id)}
              className={`filter-btn ${activeFilters.huntBehavior === option.id ? 'active' : ''}`}
            >
              <span className="filter-icon">{option.icon}</span>
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Activity Level</h4>
        <div className="filter-buttons">
          {activityOptions.map(option => (
            <button
              key={option.id}
              onClick={() => handleFilterToggle('activity', option.id)}
              className={`filter-btn ${activeFilters.activity === option.id ? 'active' : ''}`}
            >
              <span className="filter-icon">{option.icon}</span>
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BehaviorFilters;
