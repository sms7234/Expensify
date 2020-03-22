import React from 'react';
import {shallow} from 'enzyme';
import {CategoryListFilters} from '../../components/CategoryListFilters';

let setTextFilter, wrapper;

const filters = {
  text: ''
};

beforeEach(()=> {
  setTextFilter = jest.fn();
  wrapper=shallow(
    <CategoryListFilters
      filters={filters}
      setTextFilter={setTextFilter} />
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
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});
