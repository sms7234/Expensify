import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';
import ImportExpenseListItem from '../../../components/items/ImportExpenseListItem';
import categoryList from '../../fixtures/categoryList';
import accountList from '../../fixtures/accountList';
import tagList from '../../fixtures/tagsList';

const data = {
  Date: moment(),
  Amount: '5.00',
  Category: 'Groceries',
  Account: 'Bank of America',
  Tag:'',
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
    accountList={accountList}
    tagList={tagList}
    validation={[null]}
    onRemove={onRemove}
    onSave={onSave}
  />)
})

test('test that list item renders correctly', () => {
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find('StateManager').at(0).prop('options')).toHaveLength(3);
  expect(wrapper.find('StateManager').at(1).prop('options')).toHaveLength(2);
  expect(wrapper.find('StateManager').at(2).prop('options')).toHaveLength(2);
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
  const account = "Discover";
  const tag = "hoopla";
  wrapper.find('input').at(0).simulate('change', {
    target: {value: amount}
  });
  wrapper.find('StateManager').at(0).simulate('change', {
    value: category
  })
  wrapper.find('StateManager').at(1).simulate('change', {
    value: account
  })
  wrapper.find('StateManager').at(2).simulate('change', {
    value: tag
  })
  wrapper.find('input').at(1).simulate('change', {
    target: {value: business}
  });
  wrapper.find('textarea').simulate('change', {
    target: {value: note}
  });
  expect(wrapper.state('amount')).toBe(amount);
  expect(wrapper.state('category')).toBe(category);
  expect(wrapper.state('account')).toBe(account);
  expect(wrapper.state('tag')).toBe(tag);
  expect(wrapper.state('business')).toBe(business);
  expect(wrapper.state('note')).toBe(note);

  expect(wrapper.state('buttonSave')).toBe(false);
})
