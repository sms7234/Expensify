import React from 'react';
import {shallow} from 'enzyme';
import {CategorySummary} from '../../components/CategorySummary';

test('should correctly render category summary with no expenses',() => {
  const wrapper = shallow(<CategorySummary count={0} />);
  expect(wrapper).toMatchSnapshot();
});

test('should correctly render category summary with multiple expenses',() => {
  const wrapper = shallow(<CategorySummary count={47} />);
  expect(wrapper).toMatchSnapshot();
});
