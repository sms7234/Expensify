import React from 'react';
import AccountList from './AccountList';
import AccountSummary from './AccountSummary';
import AccountListFilters from './AccountListFilters';

const AccountDashboardPage = () => (
  <div>
    <AccountSummary />
    <AccountListFilters />
    <AccountList />
  </div>
)

export default AccountDashboardPage;
