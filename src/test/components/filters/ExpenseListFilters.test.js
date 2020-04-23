import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';
import {ExpenseListFilters} from '../../../components/filters/ExpenseListFilters';
import {filters, altFilters} from '../../fixtures/filters';

let setCategoryFilter, setAccountFilter, setTagFilter, setBusinessFilter, setNoteFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setCategoryFilter = jest.fn();
  setAccountFilter = jest.fn();
  setTagFilter = jest.fn();
  setBusinessFilter=jest.fn();
  setNoteFilter= jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setCategoryFilter={setCategoryFilter}
      setAccountFilter={setAccountFilter}
      setTagFilter={setTagFilter}
      setBusinessFilter={setBusinessFilter}
      setNoteFilter={setNoteFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />);
});

test('should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
  wrapper.setProps({
    filters: altFilters
  });
  expect(wrapper).toMatchSnapshot();
});

test('should handle account text filter change', () => {
  const value = 'newish'
  wrapper.find('input').at(0).simulate('change', {
    target: {value}
  });
  expect(setAccountFilter).toHaveBeenLastCalledWith(value);
});

test('should handle category text filter change', () => {
  const value = 'newish'
  wrapper.find('input').at(1).simulate('change', {
    target: {value}
  });
  expect(setCategoryFilter).toHaveBeenLastCalledWith(value);
});

test('should handle business text filter change', () => {
  const value = 'newish'
  wrapper.find('input').at(3).simulate('change', {
    target: {value}
  });
  expect(setBusinessFilter).toHaveBeenLastCalledWith(value);
});

test('should handle tag text filter change', () => {
  const value = 'newish'
  wrapper.find('input').at(2).simulate('change', {
    target: {value}
  });
  expect(setTagFilter).toHaveBeenLastCalledWith(value);
});

test('should handle note text filter change', () => {
  const value = 'newish'
  wrapper.find('input').at(4).simulate('change', {
    target: {value}
  });
  expect(setNoteFilter).toHaveBeenLastCalledWith(value);
});

test('should sort by date', () => {
  const value = 'date'
  wrapper.find('select').simulate('change', {
    target: {value}
  });
  expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', () => {
  const value = 'amount'
  wrapper.find('select').simulate('change', {
    target: {value}
  });
  expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date changes', () => {
  const startD= moment(0);
  const endD= moment(0).add(2, 'days');
  wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({startD, endD});
  expect(setStartDate).toHaveBeenCalled();
  expect(setEndDate).toHaveBeenCalled();
});

test('should handle date focus change', () => {
  const calendarFocused = 'endDate';
  wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocused);
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused);

})
