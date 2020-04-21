import React from 'react';
import TagList from '../lists/TagList';
import TagSummary from '../independents/TagSummary';
import TagListFilters from '../filters/TagListFilters';

const TagDashboardPage = () => (
  <div>
    <TagSummary />
    <TagListFilters />
    <TagList />
  </div>
)

export default TagDashboardPage;
