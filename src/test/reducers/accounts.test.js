import accountsReducer from '../../reducers/accounts';
import accounts from '../fixtures/accounts';

test('should set default state', () => {
  const state = accountsReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual([]);
});

test('should set accounts', () => {
  const action = {
    type: 'SET_ACCOUNTS',
    accounts: [accounts[0]]
  };
  const state = accountsReducer(accounts,action);
  expect(state).toEqual([accounts[0]]);
})

test('should add account to store', () => {
  const newObj= {
    id: '4',
    account: 'bank fees',
    description:''
  };
  const action = {
    type: 'ADD_ACCOUNT',
    account: newObj
  };
  const state = accountsReducer(accounts, action);
  expect(state).toEqual([...accounts, newObj]);
})

test('should remove account by id', () => {
  const action= {
    type: 'REMOVE_ACCOUNT',
    id: accounts[1].id
  };
  const state = accountsReducer(accounts,action);
  expect(state).toEqual([accounts[0],accounts[2]]);
});

test('should edit an existing account', () => {
  const newObj = {
    ...accounts[0],
    description: 'new text'
  }
  const action = {
    type: 'EDIT_ACCOUNT',
    id: accounts[0].id,
    updates: {
      description: 'new text'
    }
  };
  const state = accountsReducer(accounts, action);
  expect(state).toEqual([newObj, accounts[1], accounts[2]]);
})
