const BASE_URL = process.env.REACT_APP_VITE_JIRA_BASE_URL || process.env.VITE_JIRA_BASE_URL;
const EMAIL = process.env.REACT_APP_VITE_JIRA_EMAIL || process.env.VITE_JIRA_EMAIL;
const TOKEN = process.env.REACT_APP_VITE_JIRA_API_TOKEN || process.env.VITE_JIRA_API_TOKEN;
const PROJECT_KEY = process.env.REACT_APP_VITE_JIRA_PROJECT_KEY || process.env.VITE_JIRA_PROJECT_KEY;

// PUBLIC_INTERFACE
export function isJiraConfigured() {
  /** True if Jira env vars are present. */
  return !!(BASE_URL && EMAIL && TOKEN && PROJECT_KEY);
}

// PUBLIC_INTERFACE
export async function getJiraSummary(mealPlan) {
  /**
   * Summarize the meal plan mapping to Jira tasks.
   * Mock: counts meals and ingredients length heuristic.
   * Real: placeholder to show where fetch would happen.
   */
  const days = Object.keys(mealPlan || {});
  const meals = days.flatMap(d => Object.values(mealPlan[d] || {})).filter(Boolean);
  const totalMeals = meals.length;
  const ingredients = Math.round(totalMeals * 7.5);

  if (!isJiraConfigured()) {
    return { totalMeals, ingredients, jiraTasks: Math.round(totalMeals / 2) };
  }

  // Placeholder for actual Jira API call
  try {
    // const res = await fetch(`${BASE_URL}/rest/api/3/search?jql=project=${PROJECT_KEY}`, {
    //   headers: { 'Authorization': 'Basic ' + btoa(`${EMAIL}:${TOKEN}`) }
    // });
    // const data = await res.json();
    const data = { issues: new Array(Math.max(1, Math.round(totalMeals / 3))).fill(0) };
    return { totalMeals, ingredients, jiraTasks: data.issues.length };
  } catch {
    return { totalMeals, ingredients, jiraTasks: 0 };
  }
}
