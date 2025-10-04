const MEAL_PLAN_KEY = 'rf_meal_plan_v1';

// PUBLIC_INTERFACE
export function loadMealPlan() {
  /** Load meal plan from localStorage, defaulting to empty week. */
  try {
    const raw = localStorage.getItem(MEAL_PLAN_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return {
    Monday: { Breakfast: null, Lunch: null, Dinner: null },
    Tuesday: { Breakfast: null, Lunch: null, Dinner: null },
    Wednesday: { Breakfast: null, Lunch: null, Dinner: null },
    Thursday: { Breakfast: null, Lunch: null, Dinner: null },
    Friday: { Breakfast: null, Lunch: null, Dinner: null },
    Saturday: { Breakfast: null, Lunch: null, Dinner: null },
    Sunday: { Breakfast: null, Lunch: null, Dinner: null }
  };
}

// PUBLIC_INTERFACE
export function saveMealPlan(plan) {
  /** Save meal plan to localStorage. */
  try {
    localStorage.setItem(MEAL_PLAN_KEY, JSON.stringify(plan));
  } catch {
    // ignore
  }
}
