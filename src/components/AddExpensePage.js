import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect} from 'react-redux';
import startAddExpense from '../actions/expenses';

export class AddExpensePage extends React.Component{
  onSubmit = (expense) => {
    this.props.startAddExpense(expense);
    this.props.history.push('/expenses');
  };
  render(){
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title"> Add Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            onSubmit = {this.onSubmit}
            categoryList = {this.props.categoryList}
          />
        </div>
      </div>
    );
  }
};

const mapStateToProps=(state) => {
  return {
    categoryList: state.categories.map((item)=>{return({label: item.category, value: item.category})})
  };
};

const mapDispatchToProps = (dispatch) => ({
  startAddExpense: (expense) => dispatch(startAddExpense(expense))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddExpensePage);
