import React from 'react';
import AccountList from '../lists/AccountList';
import AccountSummary from '../independents/AccountSummary';
import AccountListFilters from '../filters/AccountListFilters';

const AccountDashboardPage = () => (
  <div>
    <AccountSummary />
    <AccountListFilters />
    <AccountList />
  </div>
)

export default AccountDashboardPage;
