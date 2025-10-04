import React from 'react';
import { useAppContext } from '../context/AppContext';
import RecipeCard from './RecipeCard';

// PUBLIC_INTERFACE
export default function RecipeGrid() {
  /** Displays recipe search results in a responsive grid. */
  const { recipes, loading } = useAppContext();

  if (loading) {
    return <div className="dashboard-section">Loading...</div>;
  }

  if (!recipes || recipes.length === 0) {
    return <div className="dashboard-section">Search for recipes by ingredients to get started.</div>;
  }

  return (
    <div className="grid" role="list" aria-label="Recipe results">
      {recipes.map(r => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </div>
  );
}
