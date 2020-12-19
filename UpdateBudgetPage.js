import React from 'react';
import {connect} from 'react-redux';
import {Bar} from 'react-chartjs-2';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import {startAddBudget, startEditBudget, startRemoveBudget} from '../../actions/budget';
import UpdateBudgetList from '../lists/UpdateBudgetList';
import BudgetFilter from '../filters/BudgetFilter';

export class UpdateBudgetPage extends React.Component {
  constructor(props){
    super(props);
    this.state={
      status: props.budgetData.length === 0 ? 'new':'update',
      name:props.budgetData.name ? props.budgetData.name : '',
      selectCategories: [],
      data:props.budgetData.data ? props.budgetData.data : [],
      income:props.budgetData.income ? props.budgetData.income : '',
      totalBudgeted: props.totalBudgeted ? props.totalBudgeted : 0,
      notes: props.budgetData.name ? props.budgetData.notes : '',
      error:''
    }
  };
  //udpates name field
  onNameChange = (e) => {
    this.setState({name: e.target.value})
  }
  //adds chosen categories to state object
  onCategorySelect = (opt) => {
    const selectCategories = [];
    opt.forEach((item) => {
      selectCategories.push(item.value)
    })
    this.setState({selectCategories});
  }
  //pushes new data to state object for list rendering
  onDataAdd = () => {
    const data=[...this.state.data]
    const usedCategories = [];
    //check for categories already used
    data.forEach((item)=>{
      usedCategories.push(item.category)
    })
    //add new categories to data field in state
    this.state.selectCategories.forEach((item) => {
      if(!usedCategories.includes(item)){
        const obj = {
          id: uuidv4(),
          category: item,
          amount: '',
          notes:''
        };
        data.push(obj);
      }
    });
    this.setState({data});
  }
  //removes list item from state object
  onItemRemove = (id) => {
    const data = [...this.state.data];
    const index = data.findIndex((item)=>item.id === id)
    if(index !== -1) {
      data.splice(index,1);
      this.setState({data});
    } else {console.log('Item not found')}
  }
  //saves changes made to a list item
  onItemChange = (id, update, key) => {
    //update amount value on item
    const data = [...this.state.data];
    const index = data.findIndex((item)=>item.id === id);
    data[index][key] = update;

    //update total $ amount budget for template
    let totalBudgeted = 0;
    data.forEach((item) => {
      if(item.amount !== ''){
        totalBudgeted += parseInt(item.amount)
      }
    })

    //set data to state
    if(totalBudgeted >= 0){
      this.setState({data});
      this.setState({totalBudgeted});
    }
  }
  //updates the anticipated income value in the state object
  onIncomeChange = (e) => {
    const income = e.target.value;
    if(!income || income.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(()=> ({income}));
    }
  }
  //updates ntoes in state object
  onNotesChange = (e) => {
    const notes = e.target.value;
    this.setState({notes})
  }
  //saves template to store & DB
  onSave = () => {
    //check if required data is filled out
    if(this.state.name==='' || !this.state.name){
      this.setState({error: 'Please fill in template name'})
    } else if (this.state.income==='' || !this.state.income) {
      this.setState({error: 'Please fill in income field'})
    }
    else {
      //reset error message
      this.setState({error:''})
      //reformat data
      const storeData = {
        name: this.state.name,
        income: this.state.income,
        notes: this.state.notes,
        updatedAt: moment().valueOf(),
        data: this.state.data
      }
      //check which AG to use    const data = this.props.budgetData.find((item) => item.id === id);
    this.setState
      if(this.state.status === 'new'){
        this.props.startAddBudget(storeData);
        this.props.history.push('/budget');
      } else {
        this.props.startEditBudget(this.props.budgetData.id, storeData);
        this.props.history.push('/budget');
      }
    }
  }
  //removes template from store & DB
  onRemove = () => {
    this.props.startRemoveBudget({id:this.props.budgetData.id});
    this.props.history.push('/budget');
  }
  //JSX
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Update Budget Template</h1>
          </div>
          <div className="content-container--subtitle">
            <h3> Template Name:</h3>
            <input
              type="text"
              placeholder="Template Name"
              className="text-input"
              value={this.state.name}
              onChange={this.onNameChange}
              autoFocus
            />
          </div>
          <div className="content-container">
            <ul>
              <li className="message__header-content">
                Template Last Updated On:<b> {moment(this.props.updatedAt).format("dddd, MMMM Do YYYY")}</b>
              </li>
            </ul>
          </div>
        </div>

        <div className="content-container">
          <div className="content-container">
            <h3>Notes about this template:</h3>
          </div>
          <div className="content-container--subtitle">
            <textarea
              className="textarea--large"
              defaultValue={this.state.notes}
              onChange={this.onNotesChange}
            />
          </div>
        </div>

        <BudgetFilter />

        <div className="content-container">
          <div className="content-container--subtitle">
            <h3>Anticipated Income: $</h3>
            <input
              type="text"
              placeholder="custom income input"
              className="text-input"
              value={this.state.income}
              onChange={this.onIncomeChange}
            />
          </div>
        </div>

        <div className="content-container">
          <div className="content-container">
            <h3>Please select desired categories</h3>
          </div>
          <Select
            placeholder="Select categories to add to budget"
            className="dropdown"
            isClearable
            isMulti
            options={this.props.categoryList}
            onChange={this.onCategorySelect}
          />
          <div className="content-container--subtitle">
            <button className="button" onClick={this.onDataAdd}> Add </button>
          </div>
        </div>

        <UpdateBudgetList
          data={this.state.data}
          income={this.state.income}
          totalBudgeted={this.state.totalBudgeted}
          onItemRemove={this.onItemRemove}
          onItemChange={this.onItemChange}
        />
        <div className="content-container">
          <div className="message__error">
            {this.state.error!=='' && <h1 className="form__error">{this.state.error}</h1>}
          </div>
          <div className="input-group--buttons">
            <button
              className="button button--group"
              onClick={this.onSave}>
              Save Template
            </button>
            <button
              className="button--group button--secondary"
              onClick={this.onRemove}>
              Delete Template
            </button>
          </div>
        </div>

      </div>
    )
  }
}

        <h3>Budget Chart</h3>
const mapStateToProps = (state, props) => {

  //filters categories into object for select component
  const filterCategories = (categories) => {
    const categoryObj = []
    categories.forEach((item) => {
      categoryObj.push({label: item.category, value: item.category})
    })
    // returns [{label: cat1, value: cat1}, {...}]
    return categoryObj;
  };

  //filter store data to pull out selected template from budget page
  const dataFinder = (arr) => {
    let budgetData;
    (!props.match.params.id) ? budgetData=[] : budgetData= arr.find((item) => item.id === props.match.params.id);
    return budgetData;
  }

  //calculates total percentage remaining for distribution
  const totalBudgetCalculator = (arr) => {
    let total = 0;
    if(arr.data && arr.data.length>0) {
      arr.data.forEach((item) => {
        if(item.amount !== ''){
          total += parseInt(item.amount)
        }
      })
    }
    return total;
  }

  return {
    categoryList: filterCategories(state.categories),
    budgetData: dataFinder(state.budgets),
    totalBudgeted: totalBudgetCalculator(dataFinder(state.budgets))
  };
};

const mapDispatchToProps = (dispatch) => ({
  startAddBudget: (budget) => dispatch(startAddBudget(budget)),
  startEditBudget: (id, budget) => dispatch(startEditBudget(id, budget)),
  startRemoveBudget: (id) => dispatch(startRemoveBudget(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateBudgetPage);
