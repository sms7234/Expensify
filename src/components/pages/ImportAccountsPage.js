import React from 'react';
import {connect} from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {startAddAccount} from '../../actions/accounts';
import ImportInstructions from '../independents/ImportInstructions';
import ImportUploadAccounts from '../independents/ImportUploadAccounts';
import ImportAccountListItem from '../items/ImportAccountListItem';
import ImportSummary from '../independents/ImportSummary';


export class ImportAccountsPage extends React.Component {
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
    this.state.data.forEach((item,index) => {
      if(item.Account===""){
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
      Account: '',
      Description: ''
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
        account: item.Account,
        description: item.Description
      })
    });
    convertedData.forEach((item) => {
      this.props.startAddAccount(item)
    })
    this.props.history.push('/accounts');
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title"> Import Accounts </h1>
            <h2 className="page-header__subtitle">Manually input or import csv data to add multiple accounts simultaneously</h2>
            <ImportSummary className="page-header__subtitle" qty={this.state.data} wordSingular={'account'} wordPlural={'accounts'}/>
          </div>
        </div>
        <ImportInstructions
          dataFormat={['Account', 'Description']}
        />
        <ImportUploadAccounts
          onDataUpload={this.onDataUpload}
          data={this.state.data}
          validation={this.state.validation}
        />
        <div className="content-container">
          <div className="list-header">
            <h4 className="show-for-mobile">Account List </h4>
            <h4 className="show-for-desktop">Account</h4>
            <h4 className="show-for-desktop">Description</h4>
          </div>
          <div className="list-body">
          {
            !this.state.data ? (
              <div className="list-item--message">
                <span>No Data Available</span>
              </div>
            ): (
              this.state.data.map((item,index) => {
                return <ImportAccountListItem
                  key = {uuidv4()}
                  {...item}
                  id={index}
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

const mapDispatchToProps = (dispatch) => ({
  startAddAccount: (account) => dispatch(startAddAccount(account))
});

export default connect(undefined, mapDispatchToProps)(ImportAccountsPage);
