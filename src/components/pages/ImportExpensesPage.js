import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import {startAddExpense} from '../../actions/expenses';
import ImportInstructions from '../independents/ImportInstructions';
import ImportUploadExpenses from '../independents/ImportUploadExpenses';
import ImportExpenseListItem from '../items/ImportExpenseListItem';
import ImportSummary from '../independents/ImportSummary';


export class ImportExpensesPage extends React.Component {
  state= {
    data: [],
    validation: [],
    buttonSave: true,
    buttonCheck: true,
  };
  onDataUpload = (data, validation) => {
    this.setState(()=>({data, validation}));
    this.setState(()=>({
      buttonUpload: true,
      buttonCheck: false
    }));
  };
  onDataCheck = () => {
    const val= this.state.validation;
    const categories = [];
    const accounts = [];
    const tags = [];
    this.props.categoryList.forEach((item) => {
      categories.push(item.label);
    })
    this.props.accountList.forEach((item) => {
      accounts.push(item.label);
    })
    this.state.data.forEach((item,index) => {
      if(!item.Amount ||!item.Business ||!item.Category ||!item.Account){
        val[index]=false;
      } else if (item.Amount.length===0 || item.Business.length===0) {
        val[index]=false;
      } else if (!categories.includes(item.Category)) {
        val[index]=false;
      }else if (!accounts.includes(item.Account)) {
        val[index]=false;
      }
      else {
        val[index]=true;
      }
    });
    this.setState(()=>({validation: val}))
    if (val.includes(false) || val.includes(null)) {
      this.setState(()=>({
        buttonSave:true,
      }))
    } else {
      this.setState(()=>({buttonSave:false}))
    }
  };
  onDataAdd = () =>{
    const newData = {
      Date: moment(),
      Amount: '',
      Account: '',
      Category: '',
      Business: '',
      Tag:'',
      Note: ''
    };
    const data = this.state.data;
    const validation = this.state.validation;
    data.push(newData);
    validation.push(null);
    this.setState(()=>({data, validation, buttonCheck: false}))
  };
  onItemRemove = (index) => {
    const data = this.state.data;
    const validation = this.state.validation;
    data.splice(index,1);
    validation.splice(index,1);
    this.setState(()=>({data, validation}));
  };
  onItemSave=(update, index) => {
    const data = this.state.data;
    data[index] = update;
    this.setState(()=>({data}));
  };
  onSubmit=() =>{
    const convertedData = [];
    this.state.data.forEach((item)=>{
      convertedData.push({
        amount: parseInt(item.Amount)*100,
        business: item.Business,
        account: item.Account,
        tag: item.Tag,
        category: item.Category,
        note: item.Note,
        purchaseDate: item.Date.valueOf()
      })
    });
    convertedData.forEach((item) => {
      this.props.startAddExpense(item)
    })
    this.props.history.push('/expenses');
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title"> Import Expenses</h1>
            <h2 className="page-header__subtitle">Manually input or import csv data to add multiple expenses simultaneously</h2>
            <ImportSummary className="page-header__subtitle" qty={this.state.data} wordSingular={'expense'} wordPlural={'expenses'}/>
          </div>
        </div>
        <ImportInstructions
          dataFormat={['Date (MM/DD/YY)', 'Amount', 'Category', 'Business', 'Notes']}
        />
        <ImportUploadExpenses
          onDataUpload={this.onDataUpload}
          data={this.state.data}
          validation={this.state.validation}
        />
        <div className="content-container">
          <div className="list-header">
            <h4 className="show-for-mobile">Expense List </h4>
            <h4 className="show-for-desktop">Date</h4>
            <h4 className="show-for-desktop">Amount</h4>
            <h4 className="show-for-desktop">Category</h4>
            <h4 className="show-for-desktop">Business</h4>
            <h4 className="show-for-desktop">Account</h4>
            <h4 className="show-for-desktop">Tag</h4>
            <h4 className="show-for-desktop">Note</h4>
          </div>
          <div className="list-body">
          {
            !this.state.data ? (
              <div className="list-item--message">
                <span>No Data Available</span>
              </div>
            ): (
              this.state.data.map((item,index) => {
                return <ImportExpenseListItem
                  key = {uuidv4()}
                  {...item}
                  id={index}
                  dateKey={uuidv4()}
                  accountList={this.props.accountList}
                  categoryList={this.props.categoryList}
                  tagList={this.props.tagList}
                  validation={this.state.validation[index]}
                  onRemove={this.onItemRemove}
                  onSave={this.onItemSave}
                />;
              })
            )
          }
          </div>
          <div className="content-container--buttons">
            <button className="button" onClick={this.onDataAdd}>Add Data</button>
            <button className="button--check" disabled={this.state.buttonCheck} onClick={this.onDataCheck}>Check Data</button>
            <button className="button" disabled={this.state.buttonSave} onClick={this.onSubmit}>Submit Data</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categoryList: state.categories.map((item)=>{return({label: item.category, value: item.category})}),
    accountList: state.accounts.map((item)=>{return({label: item.account, value: item.account})}),
    tagList: state.tags.map((item)=>{return({label: item.tag, value: item.tag})})
  };
};

const mapDispatchToProps = (dispatch) => ({
  startAddExpense: (expense) => dispatch(startAddExpense(expense))
});

export default connect(mapStateToProps, mapDispatchToProps)(ImportExpensesPage);
