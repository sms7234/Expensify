import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import expensesReducer from '../reducers/expenses';
import filterReducer from '../reducers/filters';
import authReducer from '../reducers/auth';
import categoryReducer from '../reducers/categories';
import accountsReducer from '../reducers/accounts';
import tagsReducer from '../reducers/tags';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default() => {
  //generate Store
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      categories: categoryReducer,
      accounts: accountsReducer,
      tags: tagsReducer,
      filters: filterReducer,
      auth: authReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
