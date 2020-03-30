import React from 'react';
import {Router, Route, Switch, Link, NavLink} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import CategoryDashboardPage from '../components/CategoryDashboardPage';
import LoginPage from '../components/LoginPage';
import AddExpensePage from '../components/AddExpensePage';
import AddCategoryPage from '../components/AddCategoryPage';
import EditExpensePage from '../components/EditExpensePage';
import EditCategoryPage from '../components/EditCategoryPage';
import ImportExpensesPage from '../components/ImportExpensesPage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true}/>
        <PrivateRoute path="/expenses" component={ExpenseDashboardPage}/>
        <PrivateRoute path="/categories" component={CategoryDashboardPage}/>
        <PrivateRoute path="/createExpense" component={AddExpensePage} />
        <PrivateRoute path="/createCategory" component={AddCategoryPage} />
        <PrivateRoute path="/editExpense/:id" component={EditExpensePage} />
        <PrivateRoute path="/editCategory/:id" component={EditCategoryPage} />
        <PrivateRoute path="/importExpenses" component={ImportExpensesPage} />
        <PrivateRoute path="/importCategories" component={ImportExpensesPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
)

export default AppRouter
