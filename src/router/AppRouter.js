import React from 'react';
import {Router, Route, Switch, Link, NavLink} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import LoginPage from '../components/LoginPage';
import AddExpensePage from '../components/AddExpensePage';
import AddCategoryPage from '../components/AddCategoryPage';
import AddAccountPage from '../components/AddAccountPage';
import AccountDashboardPage from '../components/AccountDashboardPage';
import CategoryDashboardPage from '../components/CategoryDashboardPage';
import DashboardPage from '../components/DashboardPage';
import EditExpensePage from '../components/EditExpensePage';
import EditCategoryPage from '../components/EditCategoryPage';
import EditAccountPage from '../components/EditAccountPage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import ImportExpensesPage from '../components/ImportExpensesPage';
import ImportCategoriesPage from '../components/ImportCategoriesPage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';



export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true}/>
        <PrivateRoute path="/dashboard" component={DashboardPage}/>
        <PrivateRoute path="/expenses" component={ExpenseDashboardPage}/>
        <PrivateRoute path="/categories" component={CategoryDashboardPage}/>
        <PrivateRoute path="/accounts" component={AccountDashboardPage}/>
        <PrivateRoute path="/createAccount" component={AddAccountPage} />
        <PrivateRoute path="/createExpense" component={AddExpensePage} />
        <PrivateRoute path="/createCategory" component={AddCategoryPage} />
        <PrivateRoute path="/editExpense/:id" component={EditExpensePage} />
        <PrivateRoute path="/editCategory/:id" component={EditCategoryPage} />
        <PrivateRoute path="/editAccount/:id" component={EditAccountPage} />
        <PrivateRoute path="/importExpenses" component={ImportExpensesPage} />
        <PrivateRoute path="/importCategories" component={ImportCategoriesPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
)

export default AppRouter
