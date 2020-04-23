import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense,
  startEditExpense
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'thisismytestuid';
const defaultAuthState = {auth:{uid}};
const createMockStore = configureMockStore([thunk]);

beforeEach((done)=>{
  const expensesData = {};
  expenses.forEach(({id, category, business, note, amount, account, tag, purchaseDate, createdAt, updatedAt})=>{
    expensesData[id] = {category, business, note, account, tag, amount, purchaseDate, createdAt, updatedAt}
  });
  database.ref(`users/${uid}/expenses`).set(expensesData).then(()=>done());
});

test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

test('should add expense 0 to db and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const expenseData = {
    category: 'Mouse',
    business: '',
    amount: 3000,
    account: "Bank of America",
    tag: '',
    note: 'this note',
    purchaseDate: 1000,
    createdAt: 100,
    updatedAt: 100
  }
  store.dispatch(startAddExpense(expenseData)).then(()=> {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });
    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test('should add expense with defaults to db and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const expenseDefault = {
    category: '',
    business: '',
    note: '',
    account: '',
    tag: '',
    amount:0,
    purchaseDate: 0,
    createdAt: 0,
    updatedAt: 0
  };
  store.dispatch(startAddExpense()).then(()=> {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefault
      }
    });
    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseDefault);
    done();
  });
});

test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  })
});

test('should fetch expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
});

test('should setup remove expense action object', () => {
  const action = removeExpense({id: '123abc'});
  expect(action).toEqual({type: 'REMOVE_EXPENSE', id: '123abc'});
});

test('should remove expense 0 from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[0].id
  store.dispatch(startRemoveExpense({id})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    });
    return database.ref(`users/${uid}/expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done()
  });
});

test('should setup edit expense action object', () => {
  const action = editExpense('123abc', {note: 'changeThis'});
  expect(action).toEqual({type: 'EDIT_EXPENSE', id: '123abc', updates: {note:'changeThis'}});
});

test('should setup edit expense action object', () => {
  const action = editExpense('123abc', {note: 'changeThis'});
  expect(action).toEqual({type: 'EDIT_EXPENSE', id: '123abc', updates: {note:'changeThis'}});
});

test('should updated expense 0 in firebase DB', (done) => {
  const store = createMockStore(defaultAuthState);
  const update = {
    description: 'updated text'
  };
  const id = expenses[0].id
  store.dispatch(startEditExpense(id, update)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates: update
    });
    return database.ref(`users/${uid}/expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val().description).toBe(update.description);
    done();
  });
});
