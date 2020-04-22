import React from 'react';
import {shallow} from 'enzyme';
import TagDashboardPage from '../../../components/pages/TagDashboardPage';

test('should render the dashboard page', () => {
  const wrapper = shallow(<TagDashboardPage />);
  expect(wrapper).toMatchSnapshot();
})
