import React from 'react';
import {connect} from 'react-redux';
import AccountForm from '../forms/AccountForm';
import {startEditAccount, startRemoveAccount} from '../../actions/accounts';

export class EditAccountPage extends React.Component{
  onSubmit=(account)=>{
    this.props.startEditAccount(this.props.accounts.id, account),
    this.props.history.push('/accounts')
  };
  onRemove= ()=> {
    this.props.startRemoveAccount({id: this.props.accounts.id}),
    this.props.history.push('/accounts')
  };
  render(){
    return(
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title"> Edit Account</h1>
          </div>
        </div>
        <div className="content-container">
          <AccountForm
            accounts={this.props.accounts}
            onSubmit={this.onSubmit}
          />
          <button className="button--secondary" onClick={this.onRemove}>Remove Account</button>
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state, props) => {
  return {
    accounts: state.accounts.find((item) => item.id === props.match.params.id)
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  startEditAccount: (id,account) => dispatch(startEditAccount(id,account)),
  startRemoveAccount: (data) => dispatch(startRemoveAccount(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditAccountPage);
