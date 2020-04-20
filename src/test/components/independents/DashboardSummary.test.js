import React from 'react';
import {shallow} from 'enzyme';
import DashboardSummary from '../../../components/independents/DashboardSummary';

test('should render the component with no data input', () => {
  const wrapper = shallow(<DashboardSummary />);
  expect(wrapper).toMatchSnapshot();
})

test('should render component with specified input', () => {
  const wrapper = shallow(<DashboardSummary income={2400} expenses={1500} />)
  expect(wrapper.find('span').at(0).text()).toBe(' $2,400.00 ');
  expect(wrapper.find('span').at(1).text()).toBe(' $1,500.00 ');
  expect(wrapper.find('span').at(2).text()).toBe('$900.00');
  expect(wrapper).toMatchSnapshot();
})
