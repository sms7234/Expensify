import React from 'react';
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom';
import AppRouter, {history} from './router/AppRouter';
import configureStore from './store/configureStore';
import {startSetExpenses} from './actions/expenses';
import {startSetCategories} from './actions/categories';
import {startSetAccounts} from './actions/accounts';
import {startSetTags} from './actions/tags';
import {login, logout} from './actions/auth';
import getVisibleExpenses from './selectors/expenses';
import LoadingPage from './components/pages/LoadingPage';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {firebase} from './firebase/firebase';

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx,document.querySelector('#app'));
    hasRendered=true;
  }
}

ReactDOM.render(<LoadingPage />,document.querySelector('#app'));


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetCategories());
    store.dispatch(startSetAccounts());
    store.dispatch(startSetTags());
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/expenses');
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
})
