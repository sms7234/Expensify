import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from '../forms/ExpenseForm';
import {startEditExpense, startRemoveExpense} from '../../actions/expenses';

export class EditExpensePage extends React.Component{
  onSubmit=(expense) => {
    this.props.startEditExpense(this.props.expense.id,expense);
    this.props.history.push('/expenses');
  };
  onRemove = () => {
    this.props.startRemoveExpense({id: this.props.expense.id});
    this.props.history.push('/expenses');
  };
  render(){
    return(
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title"> Edit Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            expense={this.props.expense}
            categoryList = {this.props.categoryList}
            onSubmit={this.onSubmit}
          />
          <button className="button--secondary" onClick={this.onRemove}>Remove Expense</button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((item) => item.id === props.match.params.id),
    categoryList: state.categories.map((item)=>{return({label: item.category, value: item.category})})
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id,expense)),
  startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
});

export default connect(mapStateToProps,mapDispatchToProps)(EditExpensePage);
