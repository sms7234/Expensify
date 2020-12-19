import React from 'react';
import {connect} from 'react-redux';
import {Doughnut, Line, Bar} from 'react-chartjs-2';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Select from 'react-select';
import moment from 'moment';
import selectExpenses from '../../selectors/expenses'
import DashboardSummary from '../independents/DashboardSummary';
import ExpenseListFilters from '../filters/ExpenseListFilters';

export class DashboardPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      legends: false,
      labels: ['no data'],
      categoryData: [{data: [0]}]
      }
    };
  onToggle = () => {
    (this.state.legends) ? this.setState({legends:false}) : this.setState({legends:true});
  }
  onCategorySelect = (opt) => {
    //sort input into array & set state
    const chosenCategories = [];
    const datasets = [];
    let n=0;

    //colors for charts
    const colors = ['#E74C3C','#9B59B6', '#2980B9', '#1ABC9C', '#27AE60', '#F1C40F', '#F39C12', '#D35400', '#C0392B', '#8E44AD', '#3498DB', '#16A085', '#2ECC71', '#F5B041', '#EB984E' ];
    const max = colors.length;

    opt.forEach((item) => {chosenCategories.push(item.value)});

    //run through categoryData
    const months = Object.keys(this.props.categoryData);
    chosenCategories.forEach((item, index) => {
      const data = [];
      const label = item;
      //loop through each date & gather category data
      months.forEach((subItem) => {
        data.push(this.props.categoryData[subItem][item])
      });
      //assign colors
      if(index===max){n+=1}
      const backgroundColor = colors[index-(n*max)];
      //push data to final holders
      datasets.push({label, data, backgroundColor})
    })
    // console.log('labels: ', months, ' categoryData: ', datasets)
    this.setState({labels: months})
    this.setState({categoryData: datasets})
  }

  render() {
    return (
      <div>
        <DashboardSummary income={this.props.income} expenses={this.props.expenses} />
        <div className="content-container">
          <ExpenseListFilters />
          <div className="content-container">

            <button className="button--toggle" onClick={this.onToggle}> Toggle Legends
            </button>

            <Tabs defaultActiveKey="pie" id="uncontrolled-tab-example" className="tabs">
              <Tab eventKey="pie" title="Expenses Breakdown">
                <div className="content-container--charts">

                  <h1> Purchase History </h1>
                  <Doughnut data={this.props.donutData} options={{legend: {display: this.state.legends, position: 'right'}}}/>
                </div>
              </Tab>
              <Tab eventKey="line" title="Account Breakdown">
                <div className="content-container--charts">
                  <h1> Remaining Funds (in $) by Date </h1>
                  <Line data={this.props.lineData} options={{legend: {display:this.state.legends}}} />
                </div>
              </Tab>
              <Tab eventKey="bar" title="Income vs Expense">
                <div className="content-container--charts">
                  <h1> Monthly Summary </h1>
                  <Bar data={this.props.monthData} options={{legend: {display:this.state.legends}}} />
                </div>
              </Tab>
              <Tab eventKey="variable-bar" title="Category History">
                <div className="content-container--charts">
                  <h1> Category History </h1>
                  <h3>add/remove desired categories</h3>
                  <p>***Warning*** Information only updates when categories are change</p>
                  <p>There is no auto-update when dates change</p>
                  <Select
                    placeholder="Select Categories to show"
                    className="dropdown"
                    isClearable
                    isMulti
                    options={this.props.categoryList}
                    onChange={this.onCategorySelect}
                  />
                  <Bar data={{labels: this.state.labels, datasets: this.state.categoryData}} options={{legend: {display:this.state.legends}}} />
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps=(state)=>{
  //color array
  const colors = ['#E74C3C','#9B59B6', '#2980B9', '#1ABC9C', '#27AE60', '#F1C40F', '#F39C12', '#D35400', '#C0392B', '#8E44AD', '#3498DB', '#16A085', '#2ECC71', '#F5B041', '#EB984E' ];

  //assign colors - pass in array with desired length
  const colorAssign = (desiredQty) => {
    const max = colors.length;
    const holder = [];
    let n=0;
    desiredQty.forEach((item,index) => {
      if (index === max*(n+1)){n = n+1}
      holder.push(colors[index-(n*max)])
    })
    //returns [color1, color2, color3]
    return holder;
  }

  //Sum data
  const sumItems = (arr) => {
    let holder = 0;
    if(arr!==[]){
      arr.forEach((item) => {
        holder = holder + item.amount
      })
    }
    return holder/100
  };

  //filter data
  const filterIncome = (arr) => {
    return arr.filter((item) => item.category==='Income' && item.tag!=="Debt-Consolidation")
  };

  const filterExpenses = (arr) => {
    return arr.filter((item)=> item.category!=="Income")
  };

  //filters categories into object for select component
  const filterCategories = (categories) => {
    const categoryHolder = [];
    const categoryObj = []
    categories.forEach((item) => {
      categoryHolder.push(item.category);
    })
    const categoryList = Array.from(new Set(categoryHolder));
    categoryList.forEach((item) => {
      categoryObj.push({label: item, value: item})
    })
    // returns [{label: cat1, value: cat1}, {...}]
    return categoryObj;
  }

  //data for pie chart
  const FilterDoughnut = (arr) => {
    const labelHolder = {};
    //generate labels
    arr.forEach((item) => {
      if(!labelHolder.hasOwnProperty(item.category) && item.category!=="Income" && item.category!=="Debt Consolidation") {
        labelHolder[item.category]=0;
      }
    });

    //sum up values for each label
    arr.forEach((item) => {
      if(item.category !== "Income" && item.category !=="Debt Consolidation") {
        labelHolder[item.category] += item.amount/100;
      }
    })

    //Generate total value of Expenses
    let keys = Object.keys(labelHolder);
    let totalSpent = 0
    for (var key of keys) {
      totalSpent = totalSpent + labelHolder[key]
    }

    //Generate % value & add text value each label
    const finalData = {}
    for (var key of keys) {
      finalData[key + ' (' + ((labelHolder[key] / totalSpent)*100).toFixed(1)+ '%)'] = labelHolder[key]
    }
    //generate colors
    const colorHolder = colorAssign(Object.keys(labelHolder));

    //reformat & returndata
    const donutData = {datasets:[{data: Object.values(finalData), backgroundColor: colorHolder}], labels:Object.keys(finalData)}

    //returns data:{labels:[a,b,c], dataset:[{label: 'a', data:[1,2,3], backgroundColor:[]}]}
    return donutData;
  };

  //data for the expense vs income chart
  const filterMonthlySums = (arr) => {
    const monthSums = {};
    const expenses=[];
    const income=[];

    //run through array & sort sums into month keys
    arr.forEach((item) => {
      //convert date to MM/YY
      const date = moment(item.purchaseDate).format('MM/YY')
      //check if month-key exists ?
      if(!monthSums.hasOwnProperty(date)){
        //create key with 0 as value
        const obj = {Income: 0, Expenses: 0}
        monthSums[date]=obj;
      }

      if(item.category === 'Income') {
        monthSums[date]['Income'] += item.amount/100;
      } else {
        monthSums[date]['Expenses'] += item.amount/100
      }
    });

    //reformat data
    const labels = Object.keys(monthSums);
    labels.forEach((item) => {
      expenses.push(monthSums[item]['Expenses']);
      income.push(monthSums[item]['Income']);
    })
    const datasets=[{
      label: 'Expenses',
      data: expenses,
      type: 'bar',
      backgroundColor: 'rgba(255,99,132,0.2)',
		  borderColor: 'rgba(255,99,132,1)',
		  borderWidth: 1,
		  hoverBackgroundColor: 'rgba(255,99,132,0.4)',
		  hoverBorderColor: 'rgba(255,99,132,1)'
    }, {
      label: 'Income',
      data: income,
      type: 'bar',
      backgroundColor: 'rgba(24,255,100,0.2)',
		  borderColor: 'rgba(24,255,100,1)',
		  borderWidth: 1,
		  hoverBackgroundColor: 'rgba(24,255,100,0.4)',
		  hoverBorderColor: 'rgba(24,255,100,1)'
    }];

    const masterData = {labels, datasets}

    //returns data:{labels:[04/20,05/20,06/20], dataset:[{label: 'expenses', data:[1,2,3], backgroundColor:'blue'},{label: income, ...}]}
    return masterData;
  }

  //data for account chart
  const filterLineData = (arr) => {arr
    //holders
    const accounts = {};
    const labels= [];
    let counter = 0
    //sort by date
    const originalData = arr.sort((a,b) => {
      return a.purchaseDate < b.purchaseDate ? -1: 1;
    });
    //pull out unique dates & accounts
    originalData.forEach((item) => {
      const curDate = moment(item.purchaseDate).format('MM/DD/YY');
      if (!labels.includes(curDate)){
        labels.push(curDate)
      }
      if(!accounts.hasOwnProperty(item.account)) {
        accounts[item.account]=[0];
      }
    })
    //run through array & sort out expenses into acctObjarr
    let lastMatch = 0;
    const len = originalData.length;
    const accountList = Object.keys(accounts);
    labels.forEach((item,index) => {
      //add prev date sum (in accounts array) as the next item in array
      if(index>0){
        accountList.forEach((item) => {
          accounts[item].push(accounts[item][index-1]);
        })
      }
      for(let i=lastMatch; i<len; i++){
        //dates are the same...
        if(moment(item).isSame(originalData[i].purchaseDate, 'day')) {
          const acctName = originalData[i].account;
          if(originalData[i].category === 'Income'){
            accounts[acctName][index] += originalData[i].amount/100
          } else {
            accounts[acctName][index] -= originalData[i].amount/100
          }
          lastMatch = i;
          counter +=1;
        }
        //item date is greater than label date
        if(moment(originalData[i].purchaseDate).isAfter(item, 'day')) {
          break;
        }
      }
    })

    //assign colors
    const colorHolder = colorAssign(accountList);

    //reformat data for chart
    const datasets = [];
    accountList.forEach((item, index) => datasets.push({label: item, data: accounts[item], backgroundColor: colorHolder[index], borderColor: colorHolder[index], fill: false}))

    //returns data:{labels:['04/01/20',b,c], dataset:[{label: 'a', data:[1,2,3], backgroundColor:'blue'},{...}]}
    return {labels, datasets}
  }

  //data for category summary chart
  const sumCategories = (expenses, categories) => {
    //holders
    const labels = [];
    const categoryObj = {};
    const masterData = {};

    //create a unique categories array
    const categoryHolder = []
    categories.forEach((item) => {
      categoryHolder.push(item.category);
    })
    const categoryList = Array.from(new Set(categoryHolder));
    categoryList.forEach((item) => {categoryObj[item] = 0})

    //run through array
    expenses.forEach((item) => {
      //convert dates
      const date = moment(item.purchaseDate).format("MM/YY");

      //assort into object
      if(!masterData.hasOwnProperty(date)){
        labels.push(date);
        masterData[date] = {...categoryObj}

      }

      if(masterData[date].hasOwnProperty(item.category)) {
        masterData[date][item.category] += item.amount/100;
      } else {
        //this means that a category input is incorrect
        console.log(`An expense with purchased on ${moment(item.purchaseDate).format('MM/DD/YY')} has the category ${item.category} assigned, which does not reflect an accurate category type.  Please correct this information in order for accurate data for be presented in the graphs.`)
      }
    })
    //returns data:{month1: {cat1: #, cat2: #}}
    return masterData;
  }

  // actual data
    let visibleExpenses = selectExpenses(state.expenses, state.filters);
    let selectedExpenses = sumItems(filterExpenses(visibleExpenses));

  return {
    expenses: sumItems(filterExpenses(visibleExpenses)),
    income: sumItems(filterIncome(visibleExpenses)),
    lineData: filterLineData(selectExpenses(state.expenses, state.filters)),
    donutData: FilterDoughnut(selectExpenses(state.expenses, state.filters)),
    monthData: filterMonthlySums(selectExpenses(state.expenses, state.filters)),
    categoryData: sumCategories(selectExpenses(state.expenses, state.filters), state.categories),
    categoryList: filterCategories(state.categories)

  };
};

export default connect(mapStateToProps)(DashboardPage);
