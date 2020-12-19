import React from 'react';
import UpdateBudgetListItem from '../items/UpdateBudgetListItem';

const UpdateBudgetList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Category</div>
      <div className="show-for-mobile">Amount ($)</div>
      <div className="show-for-mobile">Remaining</div>
      <div className="show-for-mobile">Remove</div>
      <div className="show-for-desktop">Category</div>
      <div className="show-for-desktop">Amount of Income</div>
      <div className="show-for-desktop">Remaining Income</div>
      <div className="show-for-desktop">Remove</div>
    </div>
    <div className="list-body">
      {
        props.data.length === 0 ? (
          <div className="list-item--message">
            <span>No budget items currently set</span>
          </div>
        ) : (
          props.data.map((item) => {return (
            <UpdateBudgetListItem
              key={item.id}
              id = {item.id}
              category = {item.category}
              amount = {item.amount}
              income={props.income}
              totalBudgeted={props.totalBudgeted}
              onItemRemove={props.onItemRemove}
              onItemChange={props.onItemChange}
            />
          )})
        )
      }
    </div>
  </div>
);

export default UpdateBudgetList;
