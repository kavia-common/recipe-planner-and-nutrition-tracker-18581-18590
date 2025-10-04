import React, { useEffect, useState } from 'react';
import { getJiraSummary, isJiraConfigured } from '../services/jira';
import { useAppContext } from '../context/AppContext';

// PUBLIC_INTERFACE
export default function JiraVisualization() {
  /**
   * Visualize mapping of meal plan to Jira tasks.
   * In mock mode: shows static counts.
   * If configured: shows a "Connect" stub and displays summary if available.
   */
  const { mealPlan } = useAppContext();
  const [summary, setSummary] = useState(null);
  const configured = isJiraConfigured();

  useEffect(() => {
    let mounted = true;
    (async () => {
      const s = await getJiraSummary(mealPlan);
      if (mounted) setSummary(s);
    })();
    return () => { mounted = false; };
  }, [mealPlan]);

  return (
    <div>
      {!configured && (
        <div className="banner" style={{ marginBottom: 12 }}>
          Jira mock mode. To enable, set VITE_JIRA_BASE_URL, VITE_JIRA_EMAIL, VITE_JIRA_API_TOKEN, VITE_JIRA_PROJECT_KEY.
        </div>
      )}
      {configured && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <button className="btn">Connect to Jira</button>
          <button className="btn secondary">Sync Meal Plan</button>
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 12 }}>
        <StatCard title="Total Planned Meals" value={summary?.totalMeals ?? 0} />
        <StatCard title="Ingredients Needed" value={summary?.ingredients ?? 0} />
        <StatCard title="Associated Jira Tasks" value={summary?.jiraTasks ?? 0} />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="card" style={{ padding: 12 }}>
      <div style={{ fontSize: 12, opacity: 0.8 }}>{title}</div>
      <div style={{ fontWeight: 900, fontSize: 24, color: 'var(--primary)' }}>{value}</div>
    </div>
  );
}
