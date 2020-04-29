import React from 'react';
import {shallow} from 'enzyme';
import {DashboardPage} from '../../../components/pages/DashboardPage';

const fakeData = {
  income: 2400,
  expenses: 1500,
  lineData: {labels:["04/01/20", "04/02/20", "04/03/20"], datasets:[{label: "BoA", data: [150,200,300]}, {label: "Chase", data: [300,200,100]}]},
  donutData: {labels:['Groceries', 'Eating Out'], datasets: [{label:'a', data:[500,100]}]},
  monthData:{labels:["03/20", "04/20"], datasets:[{label:"expenses", data:[500,700]}, {label:"income", data: [1000, 1000]}]},
  categoryData:{'03/20':{"Groceries": 500, "Eating Out":200}, '04/20': {"Groceries": 1000, "Eating Out": 100}},
  categoryList: [{label: "Groceries", value: "Groceries"}, {label: "Eating Out", value: "Eating Out"}]
};

test('should render page with no data', () => {
  const wrapper = shallow(<DashboardPage />);
  expect(wrapper).toMatchSnapshot();
});

test('should render page with fake data', () => {
  const wrapper = shallow(<DashboardPage income={fakeData.income} expenses={fakeData.expenses} donutData={fakeData.donutData} lineData={fakeData.lineData} monthData={fakeData.monthData} categoryList={fakeData.categoryList} categoryData={fakeData.categoryData}/>)
  expect(wrapper).toMatchSnapshot();
})
