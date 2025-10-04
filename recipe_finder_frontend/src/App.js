import React, { useEffect } from 'react';
import './index.css';
import './App.css';
import { AppProvider, useAppContext } from './context/AppContext';
import Header from './components/Header';
import FilterSidebar from './components/FilterSidebar';
import RecipeGrid from './components/RecipeGrid';
import RecipeDetailModal from './components/RecipeDetailModal';
import MealPlanner from './components/MealPlanner';
import JiraVisualization from './components/JiraVisualization';
import { theme } from './theme';

// PUBLIC_INTERFACE
function AppShell() {
  /**
   * This is the main application shell that composes the UI:
   * - Header with search and mock mode banner
   * - Filter sidebar for diets, intolerances, cuisine, time, calories
   * - Recipe grid and details modal
   * - Meal planner dashboard and Jira visualization
   */
  const { selectedRecipe, setThemeMode } = useAppContext();

  useEffect(() => {
    // Apply Neon Cyber theme to document as CSS variables
    const root = document.documentElement;
    root.style.setProperty('--bg', theme.colors.background);
    root.style.setProperty('--surface', theme.colors.surface);
    root.style.setProperty('--text', theme.colors.text);
    root.style.setProperty('--primary', theme.colors.primary);
    root.style.setProperty('--secondary', theme.colors.secondary);
    root.style.setProperty('--error', theme.colors.error);
    root.style.setProperty('--success', theme.colors.success);
    setThemeMode('dark');
  }, [setThemeMode]);

  return (
    <div className="app-container">
      <Header />
      <div className="content">
        <FilterSidebar />
        <main className="main">
          <RecipeGrid />
          {selectedRecipe && <RecipeDetailModal />}
          <section className="dashboard-section" aria-labelledby="meal-planner-heading">
            <h2 id="meal-planner-heading" className="section-title">Meal Planner</h2>
            <MealPlanner />
          </section>
          <section className="dashboard-section" aria-labelledby="jira-visualization-heading">
            <h2 id="jira-visualization-heading" className="section-title">Jira Visualization</h2>
            <JiraVisualization />
          </section>
        </main>
      </div>
      <footer className="footer">
        <span>Recipe Finder • Neon Cyber Theme</span>
      </footer>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function App() {
  /** Wrap the entire app with the AppProvider to expose global state and actions. */
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
