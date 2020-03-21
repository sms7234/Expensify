import React from 'react';
import CategoryList from './CategoryList';
import CategoryListFilters from './CategoryListFilters';
import CategorySummary from './CategorySummary';

const CategoryDashboardPage = () => (
  <div>
    <CategorySummary />
    <CategoryListFilters />
    <CategoryList />
  </div>
)

export default CategoryDashboardPage;
