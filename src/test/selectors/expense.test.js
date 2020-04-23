import moment from 'moment'
import selectExpenses from '../../selectors/expenses';
import expenses from '../fixtures/expenses';

test('should filter by text value for category', () => {
  const filters = {
    category: 'e',
    business:'',
    tag:'',
    account:'',
    note:'',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[1]]);
})

test('should filter by text value for business', () => {
  const filters = {
    category: '',
    business:'w',
    tag:'',
    account:'',
    note:'',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[0]]);
});

test('should filter by text value for tag', () => {
  const filters = {
    category: '',
    business:'',
    tag:'w',
    account:'',
    note:'',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[2]]);
});

test('should filter by text value for account', () => {
  const filters = {
    category: '',
    business:'',
    tag:'',
    account:'ch',
    note:'',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[2]]);
});

test('should filter by startDate', () => {
  const filters = {
    category: '',
    business:'',
    note:'',
    account:'',
    tag:'',
    sortBy: 'date',
    startDate: moment(0),
    endDate: undefined
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[2],expenses[0]]);
});

test('should filter by endDate', () => {
  const filters = {
    category: '',
    business:'',
    account:'',
    tag:'',
    note:'',
    sortBy: 'date',
    startDate: undefined,
    endDate: moment(0)
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[0], expenses[1]]);
});

test('should filter by date', () => {
  const filters = {
    category: '',
    business:'',
    note:'',
    account:'',
    tag:'',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[2],expenses[0],expenses[1]]);
});

test('should filter by amount', () => {
  const filters = {
    category: '',
    business:'',
    note:'',
    account:'',
    tag:'',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[1],expenses[2],expenses[0]]);
});
