import React from 'react';
import numeral from 'numeral';

const BudgetListItem = (props) => {
  //functions
  const percentValue = (budget, income) => {
    const adjIncome = income <1 ? 1:income;
    const result = (1-((adjIncome-budget)/adjIncome))
    return numeral(result).format("0.0%")
  }

  return(
    <div className="list-item">
      <div>
        <h3 className="list-item__title">{props.category}</h3>
      </div>
      <div>
        <h3 className="list-item__title">{numeral(props.amount).format("$0,0.00")} ({percentValue(props.amount,props.income)})</h3>
      </div>
    </div>
  )
};

export default BudgetListItem;
