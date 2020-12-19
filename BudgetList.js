import React from 'react';
import BudgetListItem from '../items/BudgetListItem';

const BudgetList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Budget Information</div>
      <div className="show-for-desktop">Category</div>
      <div className="show-for-desktop">Allocated Funds</div>
    </div>
    <div className="list-body">
      {
        (!props.data || props.data.length === 0) ? (
          <div className="list-item--message">
            <span>No budget items currently set</span>
          </div>
        ) : (
          props.data.map((item) => {return (
            <BudgetListItem
              key={item.id}
              id = {item.id}
              category = {item.category}
              notes = {item.notes}
              amount = {item.amount}
              income={props.income}
            />
          )})
        )
      }
    </div>
  </div>
);

export default BudgetList;
