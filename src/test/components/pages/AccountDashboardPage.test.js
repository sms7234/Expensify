import React from 'react';
import {shallow} from 'enzyme';
import AccountDashboardPage from '../../../components/pages/AccountDashboardPage';

test('should render the dashboard page', () => {
  const wrapper = shallow(<AccountDashboardPage />);
  expect(wrapper).toMatchSnapshot();
})
