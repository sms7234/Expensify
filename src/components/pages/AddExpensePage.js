import React from 'react';
import ExpenseForm from '../forms/ExpenseForm';
import { connect} from 'react-redux';
import {startAddExpense} from '../../actions/expenses';

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
            accountList = {this.props.accountList}
            tagList = {this.props.tagList}
          />
        </div>
      </div>
    );
  }
};

const mapStateToProps=(state) => {
  return {
    accountList: state.accounts.map((item)=>{return({label: item.account, value: item.account})}),
    categoryList: state.categories.map((item)=>{return({label: item.category, value: item.category})}),
    tagList: state.tags.map((item)=>{return({label: item.tag, value: item.tag})})
  };
};

const mapDispatchToProps = (dispatch) => ({
  startAddExpense: (expense) => dispatch(startAddExpense(expense))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddExpensePage);
