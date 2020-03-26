import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import Select from 'react-select';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/initialize';

const dateGenerator=(input) => {
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
      createdAt: props.Date? dateGenerator(props.Date):moment(),
      amount:props.Amount? numeral(props.Amount).format('0,0.00'):'',
      category:props.Category? props.Category:'',
      business:props.Business? props.Business:'',
      note:props.Note? props.Note:'',
      loadMe: true,
      calendarFocused: false
    }
  }
  //handlers
  onDateChange = (createdAt) => {
    if(createdAt){
      this.setState(() => ({createdAt}));
      this.props.onDateChange(createdAt, this.state.index);
    }
  };
  onFocusChange = ( {focused} ) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  onAmountChange = (e) => {
    const amount = e.target.value;
    if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(()=> ({amount}));
      this.props.onAmountChange(amount, this.state.index);
    }
  };
  onCategoryChange = (opt) => {
    const category = opt.value;
    this.setState(() => ({category}));
    this.props.onCategoryChange(category, this.state.index);
  };
  onBusinessChange = (e) => {
    const business = e.target.value;
    this.setState(() => ({business}));
    this.props.onBusinessChange(business, this.state.index);
  };
  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(()=>({note}));
    this.props.onNoteChange(note, this.state.index);
  };
  onRemove = () => {
    this.props.onRemove(this.state.index);
    // this.setState(()=>({loadMe:false}))
  }
  render() {
    if (this.state.loadMe) {
      return (
        <div>
          <div className="list-item">
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
            <button className="list-group__item" onClick={this.onRemove}>
              X
            </button>
          </div>
        </div>
      )
    } else if (!this.state.loadMe) {
      return null
    }
  }
}

export default ImportListItem;
