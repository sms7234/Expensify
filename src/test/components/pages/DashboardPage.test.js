import React from 'react';
import {shallow} from 'enzyme';
import {DashboardPage} from '../../../components/pages/DashboardPage';

const fakeData = {
  income: 2400,
  expenses: 1500,
  pieData: [['Category', 'Cost'], ['Groceries', 500], ['Eating Out', 500], ['Dog', 500]],
  lineData: [['Date', 'Remaining Funds'],['04/01/2020',500], ['04/02/2020',300], ['04/03/2020',0]]
};

test('should render page with no data', () => {
  const wrapper = shallow(<DashboardPage />);
  expect(wrapper).toMatchSnapshot();
});

test('should render page with fake data', () => {
  const wrapper = shallow(<DashboardPage income={fakeData.income} expenses={fakeData.expenses} pieData={fakeData.pieData} lineData={fakeData.lineData}/>)
  expect(wrapper).toMatchSnapshot();
})
