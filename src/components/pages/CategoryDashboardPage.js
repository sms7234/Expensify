import React from 'react';
import CategoryList from '../lists/CategoryList';
import CategoryListFilters from '../filters/CategoryListFilters';
import CategorySummary from '../independents/CategorySummary';

const CategoryDashboardPage = () => (
  <div>
    <CategorySummary />
    <CategoryListFilters />
    <CategoryList />
  </div>
)

export default CategoryDashboardPage;
