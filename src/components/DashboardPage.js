import React from 'react';
import {connect} from 'react-redux';
import Chart from 'react-google-charts';
import selectExpenses from '../selectors/expenses'
import DashboardSummary from './DashboardSummary';
import DashboardFilters from './DashboardFilters';

const DashboardPage = ({income, expenses, pieData}) => (
  <div>
    <DashboardSummary income={income} expenses={expenses} />
    <div className="content-container">
      <DashboardFilters />
      <Chart
        width={'500px'}
        height={'300px'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={pieData}
        options={{
          title: 'Purchases by category',
          // Just add this option
          is3D: true,
        }}
        rootProps={{ 'data-testid': '2' }}
      />
      <p>Column Chart Element: Shows the current date plus past years (current date range - x yr(s)) - (income excluded)</p>
      <p>Line Chart Element: Income-Expenses day-by-day ()</p>
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
      if(!tempHolder.includes(item.category)) {
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

  // actual data
    let visibleExpenses = selectExpenses(state.expenses, state.filters);
    let selectedExpenses = sumItems(filterExpenses(visibleExpenses));

  return {
    a: selectExpenses(state.expenses, state.filters),
    expenses: sumItems(filterExpenses(visibleExpenses)),
    income: sumItems(filterIncome(visibleExpenses)),
    pieData: filterPie(selectExpenses(state.expenses, state.filters))
  };
};

export default connect(mapStateToProps)(DashboardPage);
