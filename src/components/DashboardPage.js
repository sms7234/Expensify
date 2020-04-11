import React from 'react';
import {connect} from 'react-redux';
import Chart from 'react-google-charts';
import moment from 'moment';
import selectExpenses from '../selectors/expenses'
import DashboardSummary from './DashboardSummary';
import ExpenseListFilters from './ExpenseListFilters';

const DashboardPage = ({income, expenses, pieData, lineData}) => (
  <div>
    <DashboardSummary income={income} expenses={expenses} />
    <div className="content-container">
      <ExpenseListFilters />
      <div className="content-container--charts">
        <h1> Purchases by Category </h1>
        <Chart
          chartType="PieChart"
          height={400}
          loader={<div>Loading Chart</div>}
          data={pieData}
          options={{
            is3D: true,
          }}
          rootProps={{ 'data-testid': '2' }}
        />
        <h1> Remaining Funds (in $) by Date </h1>
        <Chart
          chartType="LineChart"
          height={400}
          loader={<div>Loading Chart</div>}
          data={lineData}
          options={{
            legend: {
              position: "none"
            },
            hAxis: {
              title: 'Remaining Funds',
            },
            vAxis: {
              title: 'Date',
            },
          }}
          rootProps={{ 'data-testid': '1' }}
        />
      </div>
    </div>
  </div>
)

const mapStateToProps=(state)=>{
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

  const filterPie = (arr) => {
    const tempHolder = [];
    const pieData = [['Category', 'Cost']];
    arr.forEach((item) => {
      if(!tempHolder.includes(item.category) && item.category!=="Income") {
        tempHolder.push(item.category)
      }
    });
    tempHolder.forEach((item) => {
      let sum = 0;
      arr.forEach((subItem,index) => {
        if(subItem.category===item) {
          sum = sum + subItem.amount;
        }
      });
      pieData.push([item, sum/100]);
    })
    return pieData;
  }

  const filterLine = (arr) => {
    const lineData=[['Date', 'Remaining Funds']];
    const originalData = arr.sort((a,b) => {
      return a.createdAt < b.createdAt ? -1: 1;
    });
    const len = originalData.length;
    let total=0;

    for (let i=0; i<len; i++){
      const firstDate = moment(originalData[i].createdAt).format("MM/DD/YY");
      if(i<(len-1)) { //be sure i isn't last item
        for(let j=1;j<=len;j++){
          if(j+i<len){ //be sure not to overrun the array length
            const secondDate = moment(originalData[i+j].createdAt).format("MM/DD/YY");
            if(firstDate === secondDate) {
              if(originalData[i].category === 'Income'){
                total = total + originalData[i].amount
              } else {
                total = total - originalData[i].amount
              }
            } else {
              lineData.push([firstDate, total/100])
              i=i+(j-1);
              break;
            }
          } else {
            break;
          }
        }
      } else { //if last item in array push info to array
        if(originalData[i].category === 'Income'){
          total = total + originalData[i].amount
        } else {
          total = total - originalData[i].amount
        }
        lineData.push([firstDate,total/100])
      }
    }
    return lineData;
  }
  // actual data
    let visibleExpenses = selectExpenses(state.expenses, state.filters);
    let selectedExpenses = sumItems(filterExpenses(visibleExpenses));

  return {
    a: selectExpenses(state.expenses, state.filters),
    expenses: sumItems(filterExpenses(visibleExpenses)),
    income: sumItems(filterIncome(visibleExpenses)),
    pieData: filterPie(selectExpenses(state.expenses, state.filters)),
    lineData: filterLine(selectExpenses(state.expenses, state.filters))
  };
};

export default connect(mapStateToProps)(DashboardPage);
