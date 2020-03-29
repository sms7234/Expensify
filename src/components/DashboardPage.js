import React from 'react';
import DashboardSummary from './DashboardSummary';

const DashboardPage = () => (
  <div>
    <DashboardSummary />
    <p>Summary Element: (for the selected dates) total income / total expenses / remaining</p>
    <p>Filter Element: just dates</p>
    <p>Pie Chart Element: Shows the break down of expenses by category (income excluded)</p>
    <p>Column Chart Element: Shows the current date plus past years (current date range - x yr(s)) - (income excluded)</p>
    <p>Line Chart Element: Income-Expenses day-by-day ()</p>
  </div>
)

export default DashboardPage;
