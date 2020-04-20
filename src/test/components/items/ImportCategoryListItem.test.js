import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';
import ImportCategoryListItem from '../../../components/items/ImportCategoryListItem';

const data = {
  Category: 'Groceries',
  Description: 'Text'
}

let onRemove, onSave, wrapper;

beforeEach(()=>{
  onRemove = jest.fn();
  onSave = jest.fn();
  wrapper = shallow( <ImportCategoryListItem
    key={'1'}
    {...data}
    id={0}
    validation={[null]}
    onRemove={onRemove}
    onSave={onSave}
  />)
})

test('test that list item renders correctly', () => {
  expect(wrapper).toMatchSnapshot();
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
  const category = "Healthcare";
  const description = "new text"
  wrapper.find('input').at(0).simulate('change', {
    target: {value: category}
  });
  wrapper.find('textarea').simulate('change', {
    target: {value: description}
  });
  expect(wrapper.state('category')).toBe(category);
  expect(wrapper.state('description')).toBe(description);

  expect(wrapper.state('buttonSave')).toBe(false);
})
