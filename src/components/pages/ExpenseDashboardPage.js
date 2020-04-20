import React from 'react';
import ExpensesSummary from '../independents/ExpensesSummary';
import ExpenseList from '../lists/ExpenseList';
import ExpenseListFilters from '../filters/ExpenseListFilters';

const ExpenseDashboardPage = () => (
  <div>
    <ExpensesSummary />
    <ExpenseListFilters />
    <ExpenseList />
  </div>
);

export default ExpenseDashboardPage
