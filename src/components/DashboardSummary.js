import React from 'react';
import {connect} from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses'

export class DashboardSummary extends React.Component {
  constructor(props){
    super(props);
    this.state={
      expenses: this.sumItems(this.filterExpenses(this.props.expenses)),
      income: this.sumItems(this.filterIncome(this.props.expenses))
    };
  }
  filterIncome = (arr) => {
    return arr.filter((item) => item.category==='Income')
  };
  filterExpenses = (arr) => {
    return arr.filter((item)=> item.category!=="Income")
  };
  sumItems = (arr) => {
    let holder = 0;
    if(arr!==[]){
      arr.forEach((item) => {
        holder = holder + item.amount
      })
    }
    return holder/100
  };


  render(){
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title"> Budgeting Dashboard </h1>
            <div className="content-container">
              <h2 className="page-header__subtitle">In the timeframe, specified below, you have earned <span> {numeral(this.state.expenses).format('$0,0.00')} </span> and spent <span> {numeral(this.state.income).format('$0,0.00')} </span></h2>
              <h2 className="page-header__subtitle">Remianing Funds: <span>{numeral(this.state.income - this.state.expenses).format('$0,0.00')}</span></h2>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps=(state)=>{
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(DashboardSummary);
