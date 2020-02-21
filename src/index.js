import React from 'react';
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom';
import AppRouter from './router/AppRouter'
import configureStore from './store/configureStore'
import {addExpense} from './actions/expenses'
import {setTextFilter} from './actions/filters'
import getVisibleExpenses from './selectors/expenses'
import 'normalize.css/normalize.css'
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

import moment from 'moment'


const store = configureStore();
// const unsubscribe = store.subscribe(() => {
//   const state = store.getState();
//   const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
//   console.log(visibleExpenses)
// });


store.dispatch(addExpense({description: 'Water Bill', amount: 200, createdAt: 1580588162056}));
store.dispatch(addExpense({description: 'Gas Bill', amount: 50, createdAt: 1580933872927}));
store.dispatch(addExpense({description: 'Rent', amount: 1095, createdAt: 1581797888950}))


const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

ReactDOM.render(jsx,document.querySelector('#app'))
