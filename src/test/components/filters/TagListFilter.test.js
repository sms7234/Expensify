import React from 'react';
import {shallow} from 'enzyme';
import {TagListFilters} from '../../../components/filters/TagListFilters';

let setTagFilter, wrapper;

const filters = {
  tag: ''
};

beforeEach(()=> {
  setTagFilter = jest.fn();
  wrapper=shallow(
    <TagListFilters
      filters={filters}
      setTagFilter={setTagFilter} />
  );
});

test('should render TagListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle text input', () => {
  const value="texxxxxt";
  wrapper.find('input').simulate('change', {
    target: {value}
  });
  expect(setTagFilter).toHaveBeenLastCalledWith(value);
});
