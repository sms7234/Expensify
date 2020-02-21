import {createStore, combineReducers } from 'redux';
import uuid from 'uuid';

const demoState = {
  expenses:[{
    id: 'asd',
    description: 'january rent',
    note: 'final payment',
    amount: 54500,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', //date or amount
    startDate: undefined,
    endDate: undefined
  }
};

//Action Generators
const addExpense = (
  {description = '',
  note = '',
  amount = 0,
  createdAt=0
  } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

const removeExpense = ({id} = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

const setTextFilter = (text='') => ({
  type: 'SET_TEXT',
  text
});

const sortByAmount = () => ({
  type: 'SET_SORTBY',
  sortBy: 'amount'
});

const sortByDate = () => ({
  type: 'SET_SORTBY',
  sortBy: 'date'
});

const setStartDate = (startDate) => ({
  type: 'SET_START-DATE',
  startDate
});

const setEndDate = (endDate) => ({
  type: 'SET_END-DATE',
  endDate
});

//Reducers

const expensesReducersDefaultState = []

const expensesReducer = (state = expensesReducersDefaultState, action) => {
  switch (action.type){
    case 'ADD_EXPENSE':
      return state.concat(action.expense);
    case 'REMOVE_EXPENSE':
      return state.filter((item)=> action.id!==item.id);
    case 'EDIT_EXPENSE':
      return state.map((item) => {
        if (item.id === action.id){
          return {
            ...item,
            ...action.updates
          }

        }
        else {
          return item
        }
      })
    default:
      return state;
  }
};

const filtersReducersDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};
const filtersReducer = (state=filtersReducersDefaultState,action) => {
  switch(action.type){
    case 'SET_TEXT':
      return { ...state, text: action.text}
    case 'SET_SORTBY':
      return {...state, sortBy: action.sortBy}
    case 'SET_START-DATE':
      return {...state, startDate: action.startDate}
      case 'SET_END-DATE':
        return {...state, endDate: action.endDate}
    default:
    return state;
  };
};

// sort data
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter((item) => {
    const startDateMatch = typeof startDate !== 'number' || item.createdAt >=startDate;
    const endDateMatch = typeof endDate !== 'number' || item.createdAt <=endDate;
    const textMatch =  item.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a,b) => {
    if (sortBy === 'date'){
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if (sortBy === 'amount'){
      return a.amount < b.amount ? 1 : -1;
    }
  });
};

//generate Store
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

//Run actions
store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses)
});

const rent = store.dispatch(addExpense({description: 'Rent', amount: 100, createdAt: 1000}));
const coffee = store.dispatch(addExpense({description: 'Coffee', amount: 300, createdAt: -1000}));
//store.dispatch(removeExpense({id:coffee.expense.id}));
// store.dispatch(editExpense(coffee.expense.id, {amount: 500}))
// store.dispatch(setTextFilter('e'));
// store.dispatch(sortByAmount())
store.dispatch(sortByDate())

// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(12050));
// store.dispatch(setEndDate());
