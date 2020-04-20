import React from 'react';
import {connect} from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {startAddCategory} from '../../actions/categories';
import ImportInstructions from '../independents/ImportInstructions';
import ImportUploadCategories from '../independents/ImportUploadCategories';
import ImportCategoryListItem from '../items/ImportCategoryListItem';
import ImportSummary from '../independents/ImportSummary';


export class ImportCategoriesPage extends React.Component {
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
      if(item.Category===""){
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
      Category: '',
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
        category: item.Category,
        description: item.Description
      })
    });
    convertedData.forEach((item) => {
      this.props.startAddCategory(item)
    })
    this.props.history.push('/categories');
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title"> Import Categories </h1>
            <h2 className="page-header__subtitle">Manually input or import csv data to add multiple categories simultaneously</h2>
            <ImportSummary className="page-header__subtitle" qty={this.state.data} wordSingular={'category'} wordPlural={'categories'}/>
          </div>
        </div>
        <ImportInstructions
          dataFormat={['Category', 'Description']}
        />
        <ImportUploadCategories
          onDataUpload={this.onDataUpload}
          data={this.state.data}
          validation={this.state.validation}
        />
        <div className="content-container">
          <div className="list-header">
            <h4 className="show-for-mobile">Category List </h4>
            <h4 className="show-for-desktop">Category</h4>
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
                return <ImportCategoryListItem
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
  startAddCategory: (category) => dispatch(startAddCategory(category))
});

export default connect(undefined, mapDispatchToProps)(ImportCategoriesPage);
