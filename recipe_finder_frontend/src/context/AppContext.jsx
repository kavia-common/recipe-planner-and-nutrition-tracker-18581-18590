import React, { createContext, useContext, useMemo, useEffect, useState, useCallback } from 'react';
import { searchRecipes, getRecipeDetails, isSpoonacularConfigured } from '../services/spoonacular';
import { loadMealPlan, saveMealPlan } from '../utils/storage';

// PUBLIC_INTERFACE
export const AppContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * AppProvider provides global state for:
 * - themeMode
 * - search query (ingredients)
 * - filters (diet, intolerances, cuisine, prep time, calories)
 * - recipe results and selected recipe details
 * - meal plan (persisted in localStorage)
 */
export function AppProvider({ children }) {
  const [themeMode, setThemeMode] = useState('dark');
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    diet: '',
    intolerances: [],
    cuisine: '',
    maxReadyTime: 60,
    minCalories: 0,
    maxCalories: 1200
  });
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mockMode, setMockMode] = useState(!isSpoonacularConfigured());

  const [mealPlan, setMealPlan] = useState(() => loadMealPlan());

  useEffect(() => {
    saveMealPlan(mealPlan);
  }, [mealPlan]);

  const performSearch = useCallback(async () => {
    setLoading(true);
    try {
      const results = await searchRecipes({
        ingredients: query,
        diet: filters.diet,
        intolerances: filters.intolerances,
        cuisine: filters.cuisine,
        maxReadyTime: filters.maxReadyTime,
        minCalories: filters.minCalories,
        maxCalories: filters.maxCalories
      });
      setRecipes(results);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Search error:', e);
    } finally {
      setLoading(false);
    }
  }, [query, filters]);

  const openRecipe = useCallback(async (id) => {
    setLoading(true);
    try {
      const details = await getRecipeDetails(id);
      setSelectedRecipe(details);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Details error:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const closeRecipe = () => setSelectedRecipe(null);

  const addToMealPlan = (day, mealType, recipe) => {
    setMealPlan(prev => {
      const next = { ...prev };
      next[day] = next[day] || { Breakfast: null, Lunch: null, Dinner: null };
      next[day][mealType] = recipe;
      return { ...next };
    });
  };

  const removeFromMealPlan = (day, mealType) => {
    setMealPlan(prev => {
      const next = { ...prev };
      if (next[day]) next[day][mealType] = null;
      return { ...next };
    });
  };

  const value = useMemo(() => ({
    themeMode, setThemeMode,
    query, setQuery,
    filters, setFilters,
    recipes, setRecipes,
    loading,
    mockMode,
    performSearch,
    selectedRecipe,
    openRecipe,
    closeRecipe,
    mealPlan,
    addToMealPlan,
    removeFromMealPlan
  }), [
    themeMode, query, filters, recipes, loading, mockMode,
    performSearch, selectedRecipe, openRecipe, closeRecipe, mealPlan
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAppContext() {
  /** Accessor hook for AppContext. */
  return useContext(AppContext);
}
