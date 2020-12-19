import React from 'react';
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom';
import AppRouter, {history} from './router/AppRouter';
import configureStore from './store/configureStore';
import {startSetExpenses} from './actions/expenses';
import {startSetCategories} from './actions/categories';
import {startSetAccounts} from './actions/accounts';
import {startSetTags} from './actions/tags';
import {startSetBudgets} from './actions/budget';
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

//add A2HS button
let deferredPrompt;
const addBtn = document.querySelector('#a2hs');
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js').then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetCategories());
    store.dispatch(startSetAccounts());
    store.dispatch(startSetTags());
    store.dispatch(startSetBudgets());
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
