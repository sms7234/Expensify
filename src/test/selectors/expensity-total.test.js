import selectExpensesTotal from '../../selectors/expenses-total.js';
import expenses from '../fixtures/expenses';

test('should return a total of 0 when array has no content', () => {
  const total = selectExpensesTotal([]);
  expect(total).toEqual(0);
});

test('should return a total with only 1 item in array', () => {
  const total = selectExpensesTotal([expenses[0]]);
  expect(total).toEqual(195);
});

test('should return a total with only 3 items in array', () => {
  const total = selectExpensesTotal(expenses);
  expect(total).toEqual(114195);
});
