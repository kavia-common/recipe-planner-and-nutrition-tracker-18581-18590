import React from 'react';
import { useAppContext } from '../context/AppContext';

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const MEALS = ['Breakfast','Lunch','Dinner'];

// PUBLIC_INTERFACE
export default function MealPlanner() {
  /** Weekly meal planner view with Breakfast/Lunch/Dinner slots; persisted via localStorage. */
  const { mealPlan, removeFromMealPlan } = useAppContext();

  return (
    <div style={{ overflowX: 'auto' }}>
      <table role="table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: 8 }}>Day</th>
            {MEALS.map(m => (
              <th key={m} style={{ textAlign: 'left', padding: 8 }}>{m}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DAYS.map(day => (
            <tr key={day}>
              <td style={{ padding: 8, fontWeight: 700 }}>{day}</td>
              {MEALS.map(meal => {
                const r = mealPlan?.[day]?.[meal];
                return (
                  <td key={meal} style={{ padding: 8 }}>
                    {r ? (
                      <div className="card" style={{ display: 'grid', gridTemplateColumns: '48px 1fr auto', alignItems: 'center', gap: 8, padding: 8 }}>
                        <img src={r.image} alt={r.title} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6 }} />
                        <div>
                          <div className="card-title" style={{ margin: 0 }}>{r.title}</div>
                          <div style={{ fontSize: 12, opacity: 0.8 }}>Assigned</div>
                        </div>
                        <button className="btn ghost" onClick={() => removeFromMealPlan(day, meal)} aria-label={`Remove ${r.title} from ${day} ${meal}`}>Remove</button>
                      </div>
                    ) : (
                      <div style={{
                        border: '1px dashed rgba(255,255,255,0.2)',
                        borderRadius: 8,
                        padding: 12,
                        opacity: 0.7
                      }}>
                        Empty
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
