import React from 'react';
import {shallow} from 'enzyme';
import ExpenseDashboardPage from '../../../components/pages/ExpenseDashboardPage';

test('should render the dashboard page', () => {
  const wrapper = shallow(<ExpenseDashboardPage />);
  expect(wrapper).toMatchSnapshot();
});
