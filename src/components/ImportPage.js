import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import {startAddExpense} from '../actions/expenses';
import ImportInstructions from './ImportInstructions';
import ImportUpload from './ImportUpload';
import ImportListItem from './ImportListItem';
import ImportSummary from './ImportSummary';


export class ImportPage extends React.Component {
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
    this.props.categoryList.forEach((item) => {
      categories.push(item.label);
    })
    const errorTrack=[];
    this.state.data.forEach((item,index) => {
      if(!item.Date){
        val[index]=false;
      } else if (item.Amount.length===0 || item.Business.length===0) {
        val[index]=false;
      } else if (!categories.includes(item.Category)) {
        val[index]=false;
      } else {
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
      Date: moment().format("MM/DD/YY"),
      Amount: '',
      Category: '',
      Business: '',
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
        category: item.Category,
        note: item.Note,
        createdAt: item.Date.valueOf()
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
            <h1 className="page-header__title"> Import </h1>
          </div>
        </div>
        <ImportInstructions />
        <div className="content-container">
          <ImportUpload
            onDataUpload={this.onDataUpload}
            data={this.state.data}
            validation={this.state.validation}
          />
          <ImportSummary qty={this.state.data} />
          <div>
            <h3>Filters go Here in Accordian (must be connected to state)</h3>
          </div>
          <div className="list-header">
            <h4>Date</h4>
            <h4>Amount</h4>
            <h4>Category</h4>
            <h4>Business</h4>
            <h4>Note</h4>
            <h4>Remove</h4>

          </div>
          <div className="list-body">
          {
            !this.state.data ? (
              <div className="list-item--message">
                <span>No Data Available</span>
              </div>
            ): (
              this.state.data.map((item,index) => {
                return <ImportListItem
                  key = {uuidv4()}
                  {...item}
                  id={index}
                  categoryList={this.props.categoryList}
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
    categoryList: state.categories.map((item)=>{return({label: item.category, value: item.category})
    })
  };
};

const mapDispatchToProps = (dispatch) => ({
  startAddExpense: (expense) => dispatch(startAddExpense(expense))
});

export default connect(mapStateToProps, mapDispatchToProps)(ImportPage);
