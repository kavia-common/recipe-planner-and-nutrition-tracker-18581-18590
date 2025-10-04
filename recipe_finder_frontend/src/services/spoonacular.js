import recipesMock from '../mock/recipes.json';
import nutritionMock from '../mock/nutrition.json';

const API_KEY = process.env.REACT_APP_VITE_SPOONACULAR_API_KEY || process.env.VITE_SPOONACULAR_API_KEY; // CRA or Vite compatibility
const BASE = 'https://api.spoonacular.com';

// PUBLIC_INTERFACE
export function isSpoonacularConfigured() {
  /** Returns true when an API key is configured. */
  return !!API_KEY;
}

// PUBLIC_INTERFACE
export async function searchRecipes(params) {
  /**
   * Search for recipes using Spoonacular.
   * If no API key is provided, returns mock data filtered minimally by query.
   */
  if (!isSpoonacularConfigured()) {
    const ingredients = (params.ingredients || '').toLowerCase();
    const filtered = recipesMock.filter(r => !ingredients || r.title.toLowerCase().includes(ingredients.split(',')[0].trim()));
    return filtered;
  }

  const url = new URL(`${BASE}/recipes/complexSearch`);
  if (params.ingredients) url.searchParams.set('includeIngredients', params.ingredients);
  if (params.diet) url.searchParams.set('diet', params.diet);
  if (params.cuisine) url.searchParams.set('cuisine', params.cuisine);
  if (params.intolerances?.length) url.searchParams.set('intolerances', params.intolerances.join(','));
  if (params.maxReadyTime) url.searchParams.set('maxReadyTime', String(params.maxReadyTime));
  url.searchParams.set('addRecipeNutrition', 'true');
  url.searchParams.set('number', '24');
  url.searchParams.set('apiKey', API_KEY);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Spoonacular search failed');
  const data = await res.json();
  return (data.results || []).map(x => ({
    id: x.id,
    title: x.title,
    image: x.image,
    readyInMinutes: x.readyInMinutes,
    vegetarian: x.vegetarian,
    vegan: x.vegan,
    calories: x.nutrition?.nutrients?.find(n => n.name === 'Calories')?.amount
  }));
}

// PUBLIC_INTERFACE
export async function getRecipeDetails(id) {
  /**
   * Retrieve recipe details.
   * Falls back to mock nutrition/details if not configured.
   */
  if (!isSpoonacularConfigured()) {
    const base = recipesMock.find(r => String(r.id) === String(id)) || recipesMock[0];
    return {
      id: base.id,
      title: base.title,
      image: base.image,
      readyInMinutes: base.readyInMinutes,
      vegetarian: base.vegetarian,
      vegan: base.vegan,
      calories: base.calories,
      extendedIngredients: (nutritionMock.extendedIngredients || []),
      analyzedInstructions: nutritionMock.analyzedInstructions,
      nutrition: nutritionMock.nutrition
    };
  }

  const url = `${BASE}/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Spoonacular details failed');
  const data = await res.json();
  return data;
}
