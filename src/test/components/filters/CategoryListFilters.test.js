import React from 'react';
import {shallow} from 'enzyme';
import {CategoryListFilters} from '../../../components/filters/CategoryListFilters';

let setCategoryFilter, wrapper;

const filters = {
  category: ''
};

beforeEach(()=> {
  setCategoryFilter = jest.fn();
  wrapper=shallow(
    <CategoryListFilters
      filters={filters}
      setCategoryFilter={setCategoryFilter} />
  );
});

test('should render CategoryListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle text input', () => {
  const value="texxxxxt";
  wrapper.find('input').simulate('change', {
    target: {value}
  });
  expect(setCategoryFilter).toHaveBeenLastCalledWith(value);
});
