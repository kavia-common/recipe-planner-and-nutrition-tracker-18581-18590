/**
 * Type-like JSDoc declarations used across the app. This file exists to provide
 * centralized shapes and can be converted to TypeScript in future.
 */

// PUBLIC_INTERFACE
export const MealTypes = ['Breakfast', 'Lunch', 'Dinner'];

/**
 * PUBLIC_INTERFACE
 * @typedef {Object} RecipeSummary
 * @property {number|string} id
 * @property {string} title
 * @property {string} [image]
 * @property {number} [readyInMinutes]
 * @property {boolean} [vegetarian]
 * @property {boolean} [vegan]
 * @property {number} [calories]
 */
