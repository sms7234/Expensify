import database from '../firebase/firebase';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

export const setBudgets = (budgets) => ({
  type: "SET_BUDGETS",
  budgets
});

//converts data from DB format to store format
export const convertDB2Store = (arr) => {
  //loop through array of budget object
  const storeData=[];
  arr.forEach((item) => {
    const objKeys = Object.keys(item);
    const holder = {};
    const data = [];
    objKeys.forEach((subItem) => {
      if(subItem==="name" || subItem==="income" || subItem==="updatedAt" || subItem==="id" ||subItem==="notes") {
        holder[subItem]=item[subItem]
      } else {
        //reformat categories into data holder
        data.push({
          id: uuidv4(),
          category: subItem,
          amount: item[subItem]
          })
        }
      })
    holder.data=data;
    storeData.push(holder);
    })
    return storeData;
  }

export const startSetBudgets = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/budgets`)
      .once('value')
      .then((snapshot) => {
        const budgetHolder = [];
        snapshot.forEach((child) => {
          budgetHolder.push({
            id: child.key,
            ...child.val()
          });
        });
        //reformat data & push to store
        dispatch(setBudgets(convertDB2Store(budgetHolder)));
      });
  };
};

export const addBudget = (budget) => ({
  type: "ADD_BUDGET",
  budget
});

//converts data from store format to db format
export const convertStore2DB = (arr) => {
  const dbBudget = {
    'name': arr.name,
    'income': arr.income,
    'updatedAt': arr.updatedAt,
    'notes': arr.notes
  };
  if(arr.data.length>0) {
    arr.data.forEach((item) => {
      dbBudget[item.category] = item.amount;
    })
  }
  return dbBudget;
}

export const startAddBudget = (budgetData={}) => {
  return (dispatch, getState) =>{
    //import & assign data
    const{
      name="Unnamed Template",
      income = 0,
      updatedAt = moment().valueOf(),
      notes = '',
      data=[]
    } = budgetData;
    const storeBudget={name, income, updatedAt, notes, data};
    //push data to store & DB
    const uid=getState().auth.uid;
    return database.ref(`users/${uid}/budgets`).push(convertStore2DB(storeBudget)).then((ref) => {
      dispatch(addBudget({
        id: ref.key,
        ...storeBudget
      }));
    });
  };
};

export const editBudget = (id, updates) => ({
  type: 'EDIT_BUDGET',
  id,
  updates
});

//must pass in full object for updates (due to data format with categories being individual keys)
export const startEditBudget = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    updates.updatedAt = moment().valueOf();
    return database.ref(`users/${uid}/budgets/${id}`).set(convertStore2DB(updates)).then(()=>{
      dispatch(editBudget(id,updates));
    });
  };
};

export const removeBudget = (id) => ({
  type: 'REMOVE_BUDGET',
  id
});

export const startRemoveBudget = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/budgets/${id}`).remove().then(()=>{
      dispatch(removeBudget(id));
    });
  };
};
