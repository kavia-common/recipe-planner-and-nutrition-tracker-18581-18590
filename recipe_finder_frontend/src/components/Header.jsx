import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

// PUBLIC_INTERFACE
export default function Header() {
  /** Header with search input and banner indicating mock mode when API keys are absent. */
  const { query, setQuery, performSearch, mockMode } = useAppContext();
  const [local, setLocal] = useState(query || '');

  const onSubmit = (e) => {
    e.preventDefault();
    setQuery(local);
    performSearch();
  };

  return (
    <header className="header" role="banner">
      <div className="header-inner">
        <div className="brand">🍳 Recipe Finder</div>
        {mockMode && (
          <div className="banner" role="status" aria-live="polite">
            Mock mode active. Provide Spoonacular API key in .env to enable live data.
          </div>
        )}
        <form className="search-row" onSubmit={onSubmit} role="search" aria-label="Search by ingredients">
          <input
            className="search-input"
            type="text"
            placeholder="Enter ingredients (comma-separated): e.g., chicken, rice, broccoli"
            aria-label="Ingredients"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
          />
          <button className="btn" type="submit" aria-label="Search recipes">Search</button>
        </form>
      </div>
    </header>
  );
}
