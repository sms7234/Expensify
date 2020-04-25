import React from 'react';
import {connect} from 'react-redux';
import {Doughnut, Line} from 'react-chartjs-2';
import moment from 'moment';
import selectExpenses from '../../selectors/expenses'
import DashboardSummary from '../independents/DashboardSummary';
import ExpenseListFilters from '../filters/ExpenseListFilters';

export const DashboardPage = ({income, expenses, pieData, lineData, donutData}) => (
  <div>
    <DashboardSummary income={income} expenses={expenses} />
    <div className="content-container">
      <ExpenseListFilters />
      <div className="content-container--charts">
        <h1> Purchases by Category </h1>
        <Doughnut
          data={donutData}
        />
        <span />
        <h1> Remaining Funds (in $) by Date </h1>
        <Line
          data={lineData}
        />
      </div>
    </div>
  </div>
)

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
    return arr.filter((item) => item.category==='Income')
  };

  const filterExpenses = (arr) => {
    return arr.filter((item)=> item.category!=="Income")
  };

  const FilterDoughnut = (arr) => {
    const labelHolder = {};

    //generate labels
    arr.forEach((item) => {
      if(!labelHolder.hasOwnProperty(item.category) && item.category!=="Income") {
        labelHolder[item.category]=0;
      }
    });
    //sum up values for each label
    arr.forEach((item) => {
      if(item.category !== "Income") {
        labelHolder[item.category] += item.amount/100;
      }
    })
    //generate colors
    const colorHolder = colorAssign(Object.keys(labelHolder));

    //reformat & returndata
    const donutData = {datasets:[{data: Object.values(labelHolder), backgroundColor: colorHolder}], labels:Object.keys(labelHolder)}
    return donutData;
  };

  const filterLineData = (arr) => {
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
    //run through array & sort out expenses into acctObj
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
    return {labels, datasets}

    //return correctly formatted information
    console.log('labels: ',labels, 'datasets: ',datasets)
    console.log('number of matches: ', counter, 'total expenses: ', originalData.length)

  }

  // actual data
    let visibleExpenses = selectExpenses(state.expenses, state.filters);
    let selectedExpenses = sumItems(filterExpenses(visibleExpenses));

  return {
    expenses: sumItems(filterExpenses(visibleExpenses)),
    income: sumItems(filterIncome(visibleExpenses)),
    lineData: filterLineData(selectExpenses(state.expenses, state.filters)),
    donutData: FilterDoughnut(selectExpenses(state.expenses, state.filters))
  };
};

export default connect(mapStateToProps)(DashboardPage);
