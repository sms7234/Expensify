import React from 'react';
import {shallow} from 'enzyme';
import {AccountListFilters} from '../../components/AccountListFilters';

let setAccountFilter, wrapper;

const filters = {
  account: ''
};

beforeEach(()=> {
  setAccountFilter = jest.fn();
  wrapper=shallow(
    <AccountListFilters
      filters={filters}
      setAccountFilter={setAccountFilter} />
  );
});

test('should render AccountListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle text input', () => {
  const value="texxxxxt";
  wrapper.find('input').simulate('change', {
    target: {value}
  });
  expect(setAccountFilter).toHaveBeenLastCalledWith(value);
});
