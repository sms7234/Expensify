import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
  const state = expensesReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expenses if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: -1
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should add an expense', () => {
  const newObj = {
    id:'4',
    description: 'blah',
    note:'',
    amount: 15,
    createdAt: 10
  };
  const action = {
    type: 'ADD_EXPENSE',
    expense:newObj
  }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual([...expenses,newObj])
});

test('should edit an existing expense', () => {
  const newObj = {
    id:'1',
    description: 'random',
    note:'',
    amount: 195,
    createdAt: 0
  }
  const action = {
    type: 'EDIT_EXPENSE',
    id:expenses[0].id,
    updates: {
      description: 'random'
    }
  };
  const state = expensesReducer(expenses,action);
  expect(state).toEqual([newObj, expenses[1],expenses[2]])
})

test('should not alter array when invalid id is used', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id:4,
    updates: {
      description: 'random'
    }
  };
  const state = expensesReducer(expenses,action);
  expect(state).toEqual(expenses);
})
