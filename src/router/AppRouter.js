import React from 'react';
import {Router, Route, Switch, Link, NavLink} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import LoginPage from '../components/pages/LoginPage';
import AddExpensePage from '../components/pages/AddExpensePage';
import AddCategoryPage from '../components/pages/AddCategoryPage';
import AddAccountPage from '../components/pages/AddAccountPage';
import AddTagPage from '../components/pages/AddTagPage';
import AccountDashboardPage from '../components/pages/AccountDashboardPage';
import CategoryDashboardPage from '../components/pages/CategoryDashboardPage';
import TagDashboardPage from '../components/pages/TagDashboardPage';
import DashboardPage from '../components/pages/DashboardPage';
import EditExpensePage from '../components/pages/EditExpensePage';
import EditCategoryPage from '../components/pages/EditCategoryPage';
import EditAccountPage from '../components/pages/EditAccountPage';
import EditTagPage from '../components/pages/EditTagPage';
import ExpenseDashboardPage from '../components/pages/ExpenseDashboardPage';
import ImportExpensesPage from '../components/pages/ImportExpensesPage';
import ImportCategoriesPage from '../components/pages/ImportCategoriesPage';
import ImportAccountsPage from '../components/pages/ImportAccountsPage';
import ImportTagsPage from '../components/pages/ImportTagsPage';
import NotFoundPage from '../components/pages/NotFoundPage';
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
        <PrivateRoute path="/tags" component={TagDashboardPage}/>
        <PrivateRoute path="/createAccount" component={AddAccountPage} />
        <PrivateRoute path="/createExpense" component={AddExpensePage} />
        <PrivateRoute path="/createCategory" component={AddCategoryPage} />
        <PrivateRoute path="/createTag" component={AddTagPage} />
        <PrivateRoute path="/editExpense/:id" component={EditExpensePage} />
        <PrivateRoute path="/editCategory/:id" component={EditCategoryPage} />
        <PrivateRoute path="/editAccount/:id" component={EditAccountPage} />
        <PrivateRoute path="/editTag/:id" component={EditTagPage} />
        <PrivateRoute path="/importExpenses" component={ImportExpensesPage} />
        <PrivateRoute path="/importCategories" component={ImportCategoriesPage} />
        <PrivateRoute path="/importAccounts" component={ImportAccountsPage} />
        <PrivateRoute path="/importTags" component={ImportTagsPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
)

export default AppRouter
