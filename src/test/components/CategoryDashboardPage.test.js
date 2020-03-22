import React from 'react';
import {shallow} from 'enzyme';
import CategoryDashboardPage from '../../components/CategoryDashboardPage';

test('should render the dashboard page', () => {
  const wrapper = shallow(<CategoryDashboardPage />);
  expect(wrapper).toMatchSnapshot();
})
