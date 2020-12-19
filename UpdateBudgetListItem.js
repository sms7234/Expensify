import React from 'react';
import numeral from 'numeral';

const UpdateBudgetListItem = (props) => {
  //functions
  const onItemRemove = () => {
    props.onItemRemove(props.id);
  }
  const onAmountChange = (e) => {
    const input = e.target.value
    if(!isNaN(input) && input.match(/^\d{1,4}(?!\.)$/)) {
      props.onItemChange(props.id, input, 'amount')
    } else if(input===''){
      props.onItemChange(props.id, '', 'amount');
    }
  }
  const onNotesChange = (e) => {
    const input = e.target.value
    props.onItemChange(props.id, input, 'notes')
  }

  return(
    <div className="list-item">
      <div>
        <h3 className="list-item__data">{props.category}</h3>
      </div>
      <div>
        <span>$<input
          type="text"
          placeholder="Amount ($)"
          className="text-input"
          value={props.amount}
          onChange={onAmountChange}
        /></span>
      </div>
      <div>
        <h3 className="list-item__data">{numeral(props.income-props.totalBudgeted).format('$0,0.00')} Remaining</h3>
        <h3 className="list-item__data">({numeral(1-((props.income-props.amount)/props.income)).format('0.0%')} of total Income)</h3>
      </div>
      <div>
        <button
          className="button--group button--secondary"
          onClick={onItemRemove}>
          Remove
        </button>
      </div>
    </div>
  )
};

export default UpdateBudgetListItem;
