import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';

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
    category: 'blah',
    business: '',
    tag:'',
    account:'Chase',
    note:'',
    amount: 15,
    purchaseDate: 10,
    createdAt: 0,
    updatedAt: 0
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
    category: 'random',
    business: 'hallmark',
    account:'Chase',
    tag:'',
    note:'',
    amount: 195,
    purchaseDate: 0,
    createdAt: 0,
    updatedAt: 0
  }
  const action = {
    type: 'EDIT_EXPENSE',
    id:expenses[0].id,
    updates: {
      category: 'random',
      business: 'hallmark',
      account: 'Chase'
    }
  };
  const state = expensesReducer(expenses,action);
  expect(state).toEqual([newObj, expenses[1],expenses[2]])
  expect(expenses[0].updatedAt).toBe(moment().valueOf())
})

test('should not alter array when invalid id is used', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id:4,
    updates: {
      category: 'random'
    }
  };
  const state = expensesReducer(expenses,action);
  expect(state).toEqual(expenses);
});

test('should set expenses', () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses: [expenses[1]]
  };
  const state = expensesReducer(expenses,action);
  expect(state).toEqual([expenses[1]])
});
