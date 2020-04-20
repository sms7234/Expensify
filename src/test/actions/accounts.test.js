import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  addAccount,
  startAddAccount,
  setAccounts,
  startSetAccounts,
  editAccount,
  startEditAccount,
  removeAccount,
  startRemoveAccount
} from '../../actions/accounts';
import accounts from '../fixtures/accounts';
import database from '../../firebase/firebase';

const uid = 'thisismytestuid';
const defaultAuthState={auth:{uid}};
const createMockStore = configureMockStore([thunk]);

beforeEach((done)=>{
  const accountData={};
  accounts.forEach(({id, account, description})=>{
    accountData[id]={account, description};
  });
  database.ref(`users/${uid}/accounts`).set(accountData).then(()=>done());
})

test('should set account action object with intial data', () => {
  const action = setAccounts(accounts);
  expect(action).toEqual({
    type: 'SET_ACCOUNTS',
    accounts
  })
});

test('should fetch accounts from db', (done) =>{
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetAccounts()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type:'SET_ACCOUNTS',
      accounts
    });
    done();
  });
});

test('should setup add account action object', () => {
  const action = addAccount(accounts[0]);
  expect(action).toEqual({
    type: 'ADD_ACCOUNT',
    account: accounts[0]
  });
});

test('should add new account data to db & store', (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startAddAccount(accounts[0])).then(()=>{
    const action = store.getActions();
    expect(action[0]).toEqual({
      type:'ADD_ACCOUNT',
      account: {
        id: expect.any(String),
        account: accounts[0].account,
        description: accounts[0].description
      }
    });
    return database.ref(`users/${uid}/accounts/${accounts[0].id}`).once('value');
  }).then((snapshot)=>{
    expect(snapshot.val()).toEqual({
      account: accounts[0].account,
      description: accounts[0].description
    });
    done();
  });
})

test('should setup edit action object', () => {
  const action = editAccount('123abc', {description: 'new info'});
  expect(action).toEqual({
    id: '123abc',
    type: 'EDIT_ACCOUNT',
    updates: {description: 'new info'}
  });
});

test('should update account 0 in db', (done) => {
  const store = createMockStore(defaultAuthState);
  const updates = { description: 'new text'};
  const id = accounts[0].id;
  store.dispatch(startEditAccount(id,updates)).then(()=>{
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_ACCOUNT',
      id,
      updates
    });
    return database.ref(`users/${uid}/accounts/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val().description).toBe(updates.description);
    done();
  });
});

test('should setup remove action object', () => {
  const action = removeAccount('123abc');
  expect(action).toEqual({
    id: '123abc',
    type: 'REMOVE_ACCOUNT'
  });
});

test('should remove account 0 from db', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = accounts[0].id;
  store.dispatch(startRemoveAccount({id})).then(()=>{
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_ACCOUNT',
      id
    });
    return database.ref(`users/${uid}/accounts/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
  });
});
