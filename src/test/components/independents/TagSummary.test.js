import React from 'react';
import {shallow} from 'enzyme';
import {TagSummary} from '../../../components/independents/TagSummary';

test('should correctly render tag summary with no expenses',() => {
  const wrapper = shallow(<TagSummary count={0} />);
  expect(wrapper).toMatchSnapshot();
});

test('should correctly render tag summary with multiple expenses',() => {
  const wrapper = shallow(<TagSummary count={47} />);
  expect(wrapper).toMatchSnapshot();
});
