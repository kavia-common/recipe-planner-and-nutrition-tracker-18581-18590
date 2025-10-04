import React from 'react';
import { useAppContext } from '../context/AppContext';

// PUBLIC_INTERFACE
export default function RecipeCard({ recipe }) {
  /** Card showing recipe overview; clicking opens detail modal. */
  const { openRecipe } = useAppContext();

  const onOpen = () => openRecipe(recipe.id);

  return (
    <article className="card" role="listitem">
      <img
        className="card-img"
        src={recipe.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop'}
        alt={recipe.title}
        loading="lazy"
      />
      <div className="card-body">
        <div className="card-title">{recipe.title}</div>
        <div className="card-tags">
          {recipe.vegetarian && <span className="tag">Vegetarian</span>}
          {recipe.vegan && <span className="tag">Vegan</span>}
          {recipe.readyInMinutes ? <span className="tag secondary">{recipe.readyInMinutes} min</span> : null}
        </div>
        <div className="nutri">
          {typeof recipe.calories === 'number' ? `${recipe.calories} kcal` : 'Nutrition available in details'}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          <button className="btn" onClick={onOpen} aria-label={`Open details for ${recipe.title}`}>View Details</button>
        </div>
      </div>
    </article>
  );
}
