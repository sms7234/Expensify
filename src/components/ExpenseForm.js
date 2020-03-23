import React from 'react';
import Select from 'react-select';
import moment from 'moment';
import {connect} from 'react-redux';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/initialize';


export default class ExpenseForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      category: props.expense ? props.expense.category:'',
      business: props.expense ? props.expense.business:'',
      amount: props.expense ? (props.expense.amount/100).toString():'',
      note:props.expense ? props.expense.note:'',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      categoryList: props.categoryList,
      error:''
    };
  }
  onAmountChange = (e) => {
    const amount = e.target.value;
    if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(()=> ({amount}));
    }
  };
  onCategoryChange = (opt) => {
    const category = opt.value;
    this.setState(() => ({category}));
  };
  onBusinessChange = (e) => {
    const business = e.target.value;
    this.setState(() => ({business}));
  };
  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(()=>({note}));
  };
  onDateChange = (createdAt) => {
    if(createdAt){
      this.setState(() => ({createdAt}))
    }
  };
  onFocusChange = ( {focused} ) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.category ||!this.state.business || !this.state.amount) {
      this.setState(()=> ({error:'Please provide amount, business & category'}));
    }else {
      this.setState(()=> ({error:''}));
      this.props.onSubmit({
        category: this.state.category,
        business: this.state.business,
        amount: parseFloat(this.state.amount, 10)*100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      })
    }
  };
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error!=='' && <p className="form__error">{this.state.error}</p>}
        <SingleDatePicker
          date = {this.state.createdAt}
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
