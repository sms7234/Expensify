import React from 'react';
import {shallow} from 'enzyme';
import ImportSummary from '../../components/ImportSummary';

test('should render expenses correctly with 0 expenses',()=>{
  const qty=null;
  const wrapper=shallow(<ImportSummary qty={qty} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render expenses correctly with 3 expenses',()=>{
  const qty=[1,2,3];
  const wrapper=shallow(<ImportSummary qty={qty} />);
  expect(wrapper).toMatchSnapshot();
});
