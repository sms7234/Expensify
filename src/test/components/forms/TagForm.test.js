import React from 'react';
import {shallow} from 'enzyme';
import TagForm from '../../../components/forms/TagForm';
import tags from '../../fixtures/tags';

test('should render Tag Form with no data', () => {
  const wrapper = shallow(<TagForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render TagForm with data', () => {
  const wrapper = shallow(<TagForm tag={tags[0]}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid submission', () => {
  const wrapper = shallow(<TagForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('should set tag value on change', () => {
  const value = "new tag";
  const wrapper= shallow(<TagForm />);
  wrapper.find('input').simulate('change', {
    target: {value}
  });
  expect(wrapper.state('tag')).toBe(value);
});

test('should set tag value on change', () => {
  const value = "new description";
  const wrapper= shallow(<TagForm />);
  wrapper.find('textarea').simulate('change', {
    target: {value}
  });
  expect(wrapper.state('description')).toBe(value);
});
