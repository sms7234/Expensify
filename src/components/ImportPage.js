import React from 'react';
import {connect} from 'react-redux';
import Papa from 'papaparse';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import ImportInstructions from './ImportInstructions';
import ImportListItem from './ImportListItem';
import ImportSummary from './ImportSummary';


export class ImportPage extends React.Component {
  state= {
    data: null,
    file: '',
    error: '',
    buttonUpload: true,
    buttonCheck: true,
    buttonSave: true,
    buttonAdd: true
  };
  onFileUpload = (e)=>{
    const file = e.target.files[0];
    if (file.name.match(/\.csv$/)){
      this.setState(()=> ({
        file,
        error:'',
        buttonUpload: false
      }))
    } else {
      this.setState(()=> ({
        error: 'Please upload correct file type'
      }))
    }
  };
  onDataUpload=(e)=>{
    e.preventDefault();
    if (this.state.error==='') {
      Papa.parse(this.state.file,{
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          this.setState(()=>({
            data:results.data
          }))
        },
        error: (err) => {
          this.setState(()=>{error: 'Error during parse: ', err.type})
        }
      });
      this.setState(()=>({
        buttonUpload: true,
        buttonAdd: false
      }))
    }
  };
  // onDataCheck = () => {
  //   this.state.data.forEach((item,index) => {
  //     const check1, check2,check3;
  //   })
  // };
  onDataAdd = () =>{
    const newData = {
      Date: moment().format("MM/DD/YY"),
      Amount: '',
      Category: '',
      Business: '',
      Note: ''
    };
    const data = this.state.data
    data.push(newData);
    this.setState(()=>({data}))
  };
  onDateChange = (createdAt,index) => {
    const data = this.state.data;
    data[index].Date=createdAt;
    this.setState(()=> ({data}));
  };
  onAmountChange = (amount, index) => {
    const data = this.state.data;
    data[index].Amount=amount;
    this.setState(()=> ({data}));
  };
  onCategoryChange = (category, index) => {
    const data = this.state.data;
    data[index].Category=category;
    this.setState(()=> ({data}));
  };
  onBusinessChange = (business, index) => {
    const data = this.state.data;
    data[index].Business=business;
    this.setState(()=> ({data}));
  };
  onNoteChange = (note, index) => {
    const data = this.state.data;
    data[index].Note=note;
    this.setState(()=> ({data}));
  };
  onItemRemove = (index) => {
    const data = this.state.data;
    data.splice(index,1);
    this.setState(()=>({data}));
  };
  onItemSave=(update, index) => {
    const data = this.state.data;
    data[index] = update;
    this.setState(()=>({data}));
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
          <form className="form" onSubmit={this.onDataUpload}>
            {this.state.error!=='' && <h3 className="form__error">{this.state.error}</h3>}
            <input
              type="file"
              name="file"
              onChange={this.onFileUpload}
            />
            <div>
              <button className="button" disabled={this.state.buttonUpload}>
                Upload Data
              </button>
            </div>
          </form>
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
                  onRemove={this.onItemRemove}
                  onSave={this.onItemSave}
                />;
              })
            )
          }
          </div>
          <div className="content-container--buttons">
            <button className="button" disabled={this.state.buttonAdd} onClick={this.onDataAdd}>Add Data</button>
            <button className="button--check" disabled={this.state.buttonCheck}>Check Data</button>
            <button className="button" disabled={this.state.buttonSave}>Save All</button>
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

export default connect(mapStateToProps)(ImportPage);
