import React from 'react';
import {shallow} from 'enzyme';
import {AccountSummary} from '../../../components/independents/AccountSummary';

test('should correctly render account summary with no expenses',() => {
  const wrapper = shallow(<AccountSummary count={0} />);
  expect(wrapper).toMatchSnapshot();
});

test('should correctly render account summary with multiple expenses',() => {
  const wrapper = shallow(<AccountSummary count={47} />);
  expect(wrapper).toMatchSnapshot();
});
