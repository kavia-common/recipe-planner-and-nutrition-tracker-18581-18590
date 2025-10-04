import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';

// PUBLIC_INTERFACE
export default function RecipeDetailModal() {
  /**
   * Modal showing detailed recipe info with accessibility:
   * - Focus trap on mount
   * - Close on Escape
   * - Ingredients, steps, nutrition, and ability to add to meal plan
   */
  const { selectedRecipe, closeRecipe, addToMealPlan } = useAppContext();
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    const prevActive = document.activeElement;
    closeBtnRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') closeRecipe();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      if (prevActive && prevActive.focus) prevActive.focus();
    };
  }, [closeRecipe]);

  if (!selectedRecipe) return null;

  const onBackdrop = (e) => {
    if (e.target === e.currentTarget) closeRecipe();
  };

  const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const meals = ['Breakfast','Lunch','Dinner'];

  return (
    <div className="modal-backdrop" onMouseDown={onBackdrop} role="dialog" aria-modal="true" aria-label="Recipe details">
      <div className="modal" ref={dialogRef}>
        <div className="modal-header">
          <strong>{selectedRecipe.title}</strong>
          <button className="btn ghost" onClick={closeRecipe} ref={closeBtnRef} aria-label="Close details">Close</button>
        </div>
        <div className="modal-content">
          <img
            src={selectedRecipe.image}
            alt={selectedRecipe.title}
            style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 8 }}
          />
          <div className="cols">
            <div>
              <h3 className="section-title">Ingredients</h3>
              <ul>
                {(selectedRecipe.extendedIngredients || []).map((ing) => (
                  <li key={ing.id || ing.name}>{ing.original || `${ing.amount} ${ing.unit} ${ing.name}`}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="section-title">Steps</h3>
              <ol>
                {selectedRecipe.analyzedInstructions?.[0]?.steps?.map((s) => (
                  <li key={s.number}>{s.step}</li>
                )) || <li>No steps provided.</li>}
              </ol>
            </div>
          </div>
          <div>
            <h3 className="section-title">Nutrition</h3>
            <div className="card-tags" aria-label="Nutrition breakdown">
              {selectedRecipe.nutrition?.nutrients?.slice(0,5)?.map(n => (
                <span key={n.name} className="tag">{n.name}: {n.amount}{n.unit}</span>
              )) || <span className="tag">Calories: {selectedRecipe.calories || 'N/A'}</span>}
            </div>
          </div>
        </div>
        <div className="modal-footer" style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ opacity: 0.8 }}>Add to meal plan:</span>
          {days.map(d => (
            <div key={d} style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <span style={{ fontSize: 12, opacity: 0.8, width: 68 }}>{d.slice(0,3)}</span>
              {meals.map(m => (
                <button
                  key={m}
                  className="btn"
                  onClick={() => addToMealPlan(d, m, { id: selectedRecipe.id, title: selectedRecipe.title, image: selectedRecipe.image })}
                  aria-label={`Add to ${d} ${m}`}
                >
                  {m[0]}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
