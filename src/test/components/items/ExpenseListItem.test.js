import React from 'react';
import {shallow} from 'enzyme';
import ExpenseListItem from '../../../components/items/ExpenseListItem';
import expenses from '../../fixtures/expenses'

test('render ExpenseListItem with one item', () => {

  const wrapper = shallow(<ExpenseListItem key={expenses[0].id}{...expenses[0]}/>);
  expect(wrapper).toMatchSnapshot();
})
