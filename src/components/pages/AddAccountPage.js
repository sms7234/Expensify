import React from 'react';
import AccountForm from '../forms/AccountForm';
import {connect} from 'react-redux';
import {startAddAccount} from '../../actions/accounts';

export class AddAccountPage extends React.Component{
  onSubmit=(account) => {
    this.props.startAddAccount(account);
    this.props.history.push('/accounts');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title"> Add Account </h1>
          </div>
        </div>
        <div className="content-container">
          <AccountForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  };
};

const mapDispatchToProps = (dispatch) => ({
  startAddAccount:(account) => dispatch(startAddAccount(account))
});

export default connect(undefined, mapDispatchToProps)(AddAccountPage);
