import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';
import ImportTagListItem from '../../../components/items/ImportTagListItem';

const data = {
  Tag: 'Groceries',
  Description: 'Text'
}

let onRemove, onSave, wrapper;

beforeEach(()=>{
  onRemove = jest.fn();
  onSave = jest.fn();
  wrapper = shallow( <ImportTagListItem
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
  const tag = "Healthcare";
  const description = "new text"
  wrapper.find('input').at(0).simulate('change', {
    target: {value: tag}
  });
  wrapper.find('textarea').simulate('change', {
    target: {value: description}
  });
  expect(wrapper.state('tag')).toBe(tag);
  expect(wrapper.state('description')).toBe(description);

  expect(wrapper.state('buttonSave')).toBe(false);
})
