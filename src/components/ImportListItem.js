import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { v4 as uuidv4 } from 'uuid';
import Select from 'react-select';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/initialize';

const stringToDateConverter=(input) => {
  let date;
  if(input.length===7) {
    date='0'.concat(input.slice(0,1),'-', input.slice(2,4), '-', input.slice(5));
    return moment(date);
  } else if (input.length===8) {
    date=input.slice(0,2).concat('-', input.slice(3,5), '-', input.slice(6));
    return moment(date);
  } else {
    return moment();
  }
};

export class ImportListItem extends React.Component {
  constructor(props){
    super(props);
    this.state={
      index: props.id,
      createdAt: props.Date? stringToDateConverter(props.Date):moment(),
      amount:props.Amount? numeral(props.Amount).format('0,0.00'):'',
      category:props.Category? props.Category:'',
      business:props.Business? props.Business:'',
      note:props.Note? props.Note:'',
      calendarFocused: false,
      buttonSave: true
    }
  }
  //handlers
  onDateChange = (createdAt) => {
    if(createdAt){
      this.setState(() => ({createdAt}));
    };
    if (this.state.buttonSave){
      this.setState(()=>({buttonSave:false}))
    };
  };
  onFocusChange = ( {focused} ) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  onAmountChange = (e) => {
    const amount = e.target.value;
    if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(()=> ({amount}));
    };
    if (this.state.buttonSave){
      this.setState(()=>({buttonSave:false}))
    };
  };
  onCategoryChange = (opt) => {
    const category = opt.value;
    this.setState(() => ({category}));
    if (this.state.buttonSave){
      this.setState(()=>({buttonSave:false}))
    };
  };
  onBusinessChange = (e) => {
    const business = e.target.value;
    this.setState(() => ({business}));
    if (this.state.buttonSave){
      this.setState(()=>({buttonSave:false}))
    };
  };
  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(()=>({note}));
    if (this.state.buttonSave){
      this.setState(()=>({buttonSave:false}))
    };
  };
  onRemove = () => {
    this.props.onRemove(this.state.index);
  }
  onSave=() => {
    const update = {
      Amount: this.state.amount,
      Category: this.state.category,
      Business: this.state.business,
      Note: this.state.note,
      Date: this.state.createdAt
    }
    this.props.onSave(update, this.state.index);
    this.setState(()=>({buttonSave:true}));
  }
  render() {
    return (
      <div>
        <div className="list-item">
          <SingleDatePicker
            // id={uuidv4()}
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
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <Select
            placeholder="select category"
            className="dropdown"
            isClearable
            defaultInputValue={this.state.category}
            options={this.props.categoryList}
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
            className="text-area"
            value={this.state.note}
            onChange={this.onNoteChange}>
          </textarea>
          <button className="list-group__item button--secondary" onClick={this.onRemove}>
            X
          </button>
          <button
            disabled={this.state.buttonSave}
            className="list-group__item button"
            onClick={this.onSave}>
            Save
          </button>
        </div>
      </div>
    )
  }
}

export default ImportListItem;
