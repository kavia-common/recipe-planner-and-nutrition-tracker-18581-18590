# Recipe Finder Frontend (Neon Cyber)

A React frontend that lets users search for recipes by ingredients, filter by dietary preferences, view nutritional information, plan meals, and visualize meal plans with Jira integration. Styled with a bold Neon Cyber theme.

## Features
- Search by ingredients (comma-separated)
- Filters: diet, intolerances, cuisine, max time, calories
- Recipe grid and detail modal (ingredients, steps, nutrition)
- Meal planner dashboard (Mon–Sun, Breakfast/Lunch/Dinner, localStorage persistence)
- Jira visualization placeholder with mock summary
- API services for Spoonacular and Jira with mock mode when env vars are missing
- Accessible modal, keyboard navigation, alt text

## Getting Started
Install dependencies and run:
- npm install
- npm start
App runs on http://localhost:3000

## Environment Variables
Create a .env file using .env.example:
- VITE_SPOONACULAR_API_KEY=your_key
- VITE_JIRA_BASE_URL=https://your-domain.atlassian.net
- VITE_JIRA_EMAIL=email@example.com
- VITE_JIRA_API_TOKEN=token
- VITE_JIRA_PROJECT_KEY=KEY

If not provided, the app runs in mock mode using data under src/mock.

## Project Structure
- src/components: Header, FilterSidebar, RecipeGrid, RecipeCard, RecipeDetailModal, MealPlanner, JiraVisualization
- src/context: AppContext for global state
- src/services: spoonacular.js, jira.js service layers
- src/mock: recipes.json, nutrition.json mock data
- src/theme.js: Neon Cyber theme tokens
- src/utils/storage.js: localStorage helpers

## Notes
- This CRA-based setup is kept minimal and framework-agnostic. Env variables are read using both REACT_APP_ and VITE_ prefixes for compatibility.
- To enable live data, set Spoonacular key and restart `npm start`.
