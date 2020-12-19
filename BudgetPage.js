import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';
import {Bar} from 'react-chartjs-2';
import Select from 'react-select';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import selectExpenses from '../../selectors/expenses';
import BudgetFilter from '../filters/BudgetFilter';
import BudgetList from '../lists/BudgetList';

export class BudgetPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      template:'',
      selectedData:'',
      chartData:{}
    }
  };
  //functions
  //pass in date-filtered expenses & array of budget data
  compileChartData = (expenses, selectedData) => {
    const expenseData = Object.assign({},expenses);
    const chartData = {labels:[], datasets:[]};
    const strictBudget = {label: "Strict Budget Data", type: "line", borderColor: 'red', fill: false, data:[]};
    const scaledBudget = {label: "Scaled Budget Data", type: "line", borderColor: 'orange', fill: false, data:[]};
    const actualData = {label: "Expense Data", type: "bar", backgroundColor: 'blue', data:[]}

    //generate labels & paste in budget percentages
    const anticipatedIncome = selectedData.income
    const actualIncome = (!expenseData || !expenseData.Income) ? anticipatedIncome : expenseData.Income;
    if(!expenseData || !expenseData.Income){
      const actualIncome = selectedData.income;
    } else {
      const actualIncome = expenses.Income;
      delete expenseData.Income;
    }

    let totalSpent = 0;
    selectedData.data.forEach((item) => {
      chartData.labels.push(item.category);
      strictBudget.data.push(parseInt(item.amount));
      scaledBudget.data.push(((actualIncome*parseInt(item.amount))/anticipatedIncome).toFixed(2))
      totalSpent+=parseInt(item.amount)
    })

    //generate expense dataset
    chartData.labels.forEach((item) => {
      if(expenseData.hasOwnProperty(item)){
        actualData.data.push(expenseData[item]);
        delete expenseData[item]

      } else {
        actualData.data.push(0)
      }
    })

    //generate final label for remaining funds (not budgeted)
    // chartData.labels.push("Remaining Funds");
    // strictBudget.data.push(anticipatedIncome-totalSpent)
    // scaledBudget.data.push(((actualIncome*totalSpent)/anticipatedIncome).toFixed(2))
    //
    // const expenseCategories = Object.keys(expenseData);
    // let sum = 0
    // expenseCategories.forEach((item) => {
    //   sum += expenseData[item]
    // })
    // console.log(totalSpent)
    // console.log(sum)
    // console.log(expenseCategories)
    // actualData.data.push(actualIncome-sum)


    //return data
    chartData.datasets.push(strictBudget);
    chartData.datasets.push(scaledBudget);
    chartData.datasets.push(actualData);
    return chartData;
  }
  onTemplateChange = (opt) => {
    const id = opt.value
    //push id to state.template
    this.setState({template: id})

    //grab template & chart data & save to state
    if(id!==''){
      const selectedData = this.props.budgetData.find((item) => item.id === id)
      this.setState({
        selectedData,
        chartData: this.compileChartData(this.props.expenseData, selectedData)
      })
    } else { this.setState({selectedData:'', chartData:{}})}
  }
  onUpdate = () => {
    if(this.state.template === '') {
      this.props.history.push('/updateBudget')
    } else {
      this.props.history.push(`/updateBudget/${this.state.template}`)
    }
  }
  //selectedData should be input & output will be JSX
  calculateRemaining = (arr) => {
    let total = 0;
    arr.data.forEach((item) => {
      total += parseInt(item.amount)
    })
    return (arr.income-total);
  }
  render(){
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Budgets</h1>
            <Select
              placeholder="select desired budget template"
              className="dropdown"
              defaultValue={{label: 'New Template', value: ''}}
              options={this.props.templateList}
              onChange={this.onTemplateChange}
            />

            {(this.state.selectedData !== '') &&
              <ul>
                <li className="message__header-content"><b>Last Updated:</b> {moment(this.state.selectedData.updatedAt).format('dddd, MMMM Do YYYY')}</li>

                <li className="message__header-content"><b>Anticipated Income:</b> {numeral(this.state.selectedData.income).format('$0,0.00')}</li>

                <li className="message__header-content"><b>Unbudgeted Funds:</b> {numeral(this.calculateRemaining(this.state.selectedData)).format("$0,0.00")} ({numeral(1-((this.state.selectedData.income-this.calculateRemaining(this.state.selectedData))/this.state.selectedData.income)).format("0.0%")})</li>

                <li className="message__header-content"><b>Notes:</b> {this.state.selectedData.notes}</li>
              </ul>
            }

            <button
              className="button button--group"
              onClick={this.onUpdate}
              >
              Update Template
            </button>
          </div>
        </div>
        <BudgetFilter />

        <div className="content-container">
          <Tabs defaultActiveKey="pie" id="uncontrolled-tab-example" className="tabs">
            <Tab eventKey="chart" title="Budget vs Expenses Chart">
              <div className="content-container--charts">
                <div className="content-container--subHeader">
                  <h2>Budget Chart</h2>
                </div>
                <div className="content-container--subtitle">
                  <button className="button" onClick={() => this.onTemplateChange({value:this.state.template})}>
                    Refresh Chart
                  </button>
                </div>

                <Bar data={this.state.chartData} />
              </div>
            </Tab>
            <Tab eventKey="table" title="Budget Breakdown Table">
              <div className="content-container">
                <div className="content-container--charts">
                  <h2>Budget Table</h2>
                </div>
                <BudgetList
                  data={this.state.selectedData.data}
                  income={this.state.selectedData.income}
                />
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }
}




const mapStateToProps = (state) => {
  //array of budget template names in object for select
  const templateListFilter = (arr) => {
    const templateList = [{label:'New Template', value:''}];
    arr.forEach((item) => {
      templateList.push({label: item.name, value: item.id})
    })
    return templateList;
  }

  //returns an object with expense & budget data for charts
  const sumCategories = (expenses) => {
    const categoryObj = {}
    expenses.forEach((item) => {
      if(categoryObj.hasOwnProperty(item.category)){
        categoryObj[item.category]+=item.amount/100
      }else {
        categoryObj[item.category]=item.amount/100
      }
    })
    return categoryObj
  }

  return {
    budgetData: state.budgets,
    templateList: templateListFilter(state.budgets),
    expenseData: sumCategories(selectExpenses(state.expenses, state.filters))
  };
};

export default connect(mapStateToProps)(BudgetPage);
