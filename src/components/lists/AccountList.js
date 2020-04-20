import React from  'react';
import {connect} from 'react-redux';
import TwoDataFieldListItem from '../items/TwoDataFieldListItem';
import selectAccounts from '../../selectors/accounts';


export const AccountList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Accounts</div>
      <div className="show-for-desktop">Accounts</div>
      <div className="show-for-desktop">Description</div>
    </div>
    <div className="list-body">
    {
      props.accounts.length === 0 ? (
        <div className="list-item--message">
          <span>No accounts to show</span>
        </div>
      ): (
        props.accounts.map((item) => {return <TwoDataFieldListItem
       key={item.id}
       id={item.id}
       value={item.account}
       description={item.description}
       location={'editAccount'}/>;})
      )
    }
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    accounts: selectAccounts(state.accounts, state.filters)
  };
};

export default connect(mapStateToProps)(AccountList);
