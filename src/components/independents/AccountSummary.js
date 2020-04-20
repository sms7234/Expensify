import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

export const AccountSummary =({count}) => {
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title"> Account List </h1>
        <h2 className="page-header__subtitle">Total number of accounts: <span>{count}</span></h2>
        <div className="page-header__actions">
          <Link className="button" to="/createAccount">Add Account</Link>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    count: state.accounts.length
  };
};

export default connect(mapStateToProps)(AccountSummary);
