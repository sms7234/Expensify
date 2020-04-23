import React from 'react';
import Select from 'react-select';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/initialize';


export default class ExpenseForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      account: props.expense ? props.expense.account:'',
      category: props.expense ? props.expense.category:'',
      tag: props.expense ? props.expense.tag:'',
      business: props.expense ? props.expense.business:'',
      amount: props.expense ? (props.expense.amount/100).toString():'',
      note:props.expense ? props.expense.note:'',
      purchaseDate: props.expense ? moment(props.expense.purchaseDate) : moment(),
      calendarFocused: false,
      accountList: props.accountList,
      categoryList: props.categoryList,
      tagList: props.tagList,
      error:''
    };
  }
  onAmountChange = (e) => {
    const amount = e.target.value;
    if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(()=> ({amount}));
    }
  };
  onAccountChange = (opt) => {
    const account = opt.value;
    this.setState(() => ({account}));
  };
  onCategoryChange = (opt) => {
    const category = opt.value;
    this.setState(() => ({category}));
  };
  onTagChange = (opt) => {
    const tag = opt.value;
    this.setState(() => ({tag}));
  };
  onBusinessChange = (e) => {
    const business = e.target.value;
    this.setState(() => ({business}));
  };
  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(()=>({note}));
  };
  onDateChange = (purchaseDate) => {
    if(purchaseDate){
      this.setState(() => ({purchaseDate}))
    }
  };
  onFocusChange = ( {focused} ) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.category ||!this.state.business || !this.state.amount || !this.state.account) {
      this.setState(()=> ({error:'Please provide account, amount, business & category'}));
    }else {
      this.setState(()=> ({error:''}));
      this.props.onSubmit({
        account: this.state.account,
        category: this.state.category,
        tag: this.state.tag,
        business: this.state.business,
        amount: parseFloat(this.state.amount, 10)*100,
        purchaseDate: this.state.purchaseDate.valueOf(),
        note: this.state.note
      })
    }
  };
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error!=='' && <p className="form__error">{this.state.error}</p>}
        <SingleDatePicker
          date = {this.state.purchaseDate}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        <input
          type="text"
          placeholder="Amount"
          className="text-input"
          autoFocus
          value={this.state.amount}
          onChange={this.onAmountChange}
        />
        <Select
          placeholder="select category"
          className="dropdown"
          isClearable
          defaultInputValue={this.state.category}
          options={this.state.categoryList}
          onChange={this.onCategoryChange}
        />
        <input
          type="text"
          placeholder="Business"
          className="text-input"
          value={this.state.business}
          onChange={this.onBusinessChange}
        />
        <Select
          placeholder="select account"
          className="dropdown"
          isClearable
          defaultInputValue={this.state.account}
          options={this.state.accountList}
          onChange={this.onAccountChange}
        />
        <Select
          placeholder="select tag"
          className="dropdown"
          isClearable
          defaultInputValue={this.state.tag}
          options={this.state.tagList}
          onChange={this.onTagChange}
        />
        <textarea
          placeholder= "Add a note for your expense (optional)"
          className="textarea"
          value={this.state.note}
          onChange={this.onNoteChange}>
        </textarea>
        <div>
          <button className="button">
            Save Expense
          </button>
        </div>
      </form>
    )
  }
}
