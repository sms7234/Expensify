import React from 'react';
import {shallow} from 'enzyme';
import ImportInstructions from '../../components/ImportInstructions';

test('match snapshot of instructions page', () => {
  const wrapper = shallow(<ImportInstructions dataFormat={['data1', 'data2']}/>);
  expect(wrapper).toMatchSnapshot();
})
