import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';
import ImportExpenseListItem from '../../../components/items/ImportExpenseListItem';
import categoryList from '../../fixtures/categoryList';

const data = {
  Date: moment(),
  Amount: '5.00',
  Category: 'Groceries',
  Business: 'Walmart',
  Note: ''
}

let onRemove, onSave, wrapper;

beforeEach(()=>{
  onRemove = jest.fn();
  onSave = jest.fn();
  wrapper = shallow( <ImportExpenseListItem
    key={'1'}
    {...data}
    id={0}
    dateKey={'1'}
    categoryList={categoryList}
    validation={[null]}
    onRemove={onRemove}
    onSave={onSave}
  />)
})

test('test that list item renders correctly', () => {
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find('StateManager').prop('options')).toHaveLength(3);
})

test('test that remove function runs', () => {
  wrapper.find('button').at(0).simulate('click');
  expect(onRemove).toHaveBeenCalled();
});

test('test that save function runs', () => {
  wrapper.find('button').at(1).simulate('click');
  expect(onSave).toHaveBeenCalled();
  expect(wrapper.state('buttonSave')).toBe(true);
});

test('test that list item updates correctly',() => {
  const amount = "100.25";
  const category = categoryList[1].value
  const business = "new Business";
  const note = "new note";
  wrapper.find('input').at(0).simulate('change', {
    target: {value: amount}
  });
  wrapper.find('StateManager').simulate('change', {
    value: category
  })
  wrapper.find('input').at(1).simulate('change', {
    target: {value: business}
  });
  wrapper.find('textarea').simulate('change', {
    target: {value: note}
  });
  expect(wrapper.state('amount')).toBe(amount);
  expect(wrapper.state('category')).toBe(category);
  expect(wrapper.state('business')).toBe(business);
  expect(wrapper.state('note')).toBe(note);

  expect(wrapper.state('buttonSave')).toBe(false);
})
