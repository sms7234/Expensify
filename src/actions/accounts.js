import database from '../firebase/firebase';

export const setAccounts = (accounts) => ({
  type: "SET_ACCOUNTS",
  accounts
});

export const startSetAccounts = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/accounts`)
      .once('value')
      .then((snapshot) => {
        const accounts = [];
        snapshot.forEach((child) => {
          accounts.push({
            id: child.key,
            ...child.val()
          });
        });
        dispatch(setAccounts(accounts));
      });
  };
};

const addAccount = (account) =>({
  type: "ADD_ACCOUNT",
  account
});

export const startAddAccount = (accountData={}) => {
  return (dispatch, getState) => {
    const {
      account='',
      description=''
    } = accountData;
    const accountItem={account,description};
    const uid=getState().auth.uid;
    return database.ref(`users/${uid}/accounts`).push(accountItem).then((ref)=>{
      dispatch(addAccount({
        id: ref.key,
        ...accountItem
      }));
    });
  };
};

export const editAccount = (id, updates) => ({
  type: 'EDIT_ACCOUNT',
  id,
  updates
});

export const startEditAccount = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/accounts/${id}`).update(updates).then(()=>{
      dispatch(editAccount(id,updates));
    });
  };
};

export const removeAccount = (id) => ({
  type: 'REMOVE_ACCOUNT',
  id
});

export const startRemoveAccount = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/accounts/${id}`).remove().then(()=>{
      dispatch(removeAccount(id));
    });
  };
};
