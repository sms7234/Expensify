import database from '../firebase/firebase';

export const setAccounts = (accounts) => ({
  type: "SET_ACCOUNTS",
  accounts
});

export const startSetAccounts = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`user/${uid}/accounts`)
      .once('value')
      .then((snapshot) => {
        const accounts = [];
        snapshot.forEach((child) => {
          categories.push({
            id: child.key,
            ...child.value()
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
