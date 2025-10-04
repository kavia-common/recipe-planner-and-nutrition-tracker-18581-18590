import React from 'react';
import { useAppContext } from '../context/AppContext';

const DIETS = ['', 'vegan', 'vegetarian', 'keto'];
const INTOLERANCES = ['gluten', 'dairy', 'nuts'];
const CUISINES = ['', 'italian', 'mexican', 'indian', 'chinese', 'american'];

// PUBLIC_INTERFACE
export default function FilterSidebar() {
  /** Sidebar filters controlling diet, intolerances, cuisine, time, and calories. */
  const { filters, setFilters, performSearch } = useAppContext();

  const toggleIntolerance = (item) => {
    const has = filters.intolerances.includes(item);
    const next = has ? filters.intolerances.filter(x => x !== item) : [...filters.intolerances, item];
    setFilters({ ...filters, intolerances: next });
  };

  return (
    <aside className="sidebar" aria-label="Filters">
      <h3>Filters</h3>

      <div className="filter-group">
        <label className="label" htmlFor="diet">Diet</label>
        <select
          id="diet"
          className="select"
          value={filters.diet}
          onChange={(e) => setFilters({ ...filters, diet: e.target.value })}
        >
          {DIETS.map(d => <option key={d} value={d}>{d || 'Any'}</option>)}
        </select>
      </div>

      <div className="filter-group">
        <span className="label">Intolerances</span>
        <div role="group" aria-label="Intolerances">
          {INTOLERANCES.map(intol => (
            <label key={intol} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
              <input
                type="checkbox"
                checked={filters.intolerances.includes(intol)}
                onChange={() => toggleIntolerance(intol)}
              />
              {intol}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label className="label" htmlFor="cuisine">Cuisine</label>
        <select
          id="cuisine"
          className="select"
          value={filters.cuisine}
          onChange={(e) => setFilters({ ...filters, cuisine: e.target.value })}
        >
          {CUISINES.map(c => <option key={c} value={c}>{c || 'Any'}</option>)}
        </select>
      </div>

      <div className="filter-group">
        <label className="label" htmlFor="time">Max Prep Time (min)</label>
        <input
          id="time"
          type="number"
          className="input"
          min={5}
          max={240}
          value={filters.maxReadyTime}
          onChange={(e) => setFilters({ ...filters, maxReadyTime: Number(e.target.value) })}
        />
      </div>

      <div className="filter-group">
        <label className="label" htmlFor="calMin">Calories Range</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <input
            id="calMin"
            type="number"
            className="input"
            placeholder="Min"
            value={filters.minCalories}
            onChange={(e) => setFilters({ ...filters, minCalories: Number(e.target.value) })}
          />
          <input
            id="calMax"
            type="number"
            className="input"
            placeholder="Max"
            value={filters.maxCalories}
            onChange={(e) => setFilters({ ...filters, maxCalories: Number(e.target.value) })}
          />
        </div>
      </div>

      <button className="btn secondary" onClick={performSearch} aria-label="Apply filters">Apply Filters</button>
    </aside>
  );
}
