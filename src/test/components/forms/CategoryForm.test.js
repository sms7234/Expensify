import React from 'react';
import {shallow} from 'enzyme';
import CategoryForm from '../../../components/forms/CategoryForm';
import categories from '../../fixtures/categories';

test('should render Category Form with no data', () => {
  const wrapper = shallow(<CategoryForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render CategoryForm with data', () => {
  const wrapper = shallow(<CategoryForm category={categories[0]}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid submission', () => {
  const wrapper = shallow(<CategoryForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('should set category value on change', () => {
  const value = "new category";
  const wrapper= shallow(<CategoryForm />);
  wrapper.find('input').simulate('change', {
    target: {value}
  });
  expect(wrapper.state('category')).toBe(value);
});

test('should set category value on change', () => {
  const value = "new description";
  const wrapper= shallow(<CategoryForm />);
  wrapper.find('textarea').simulate('change', {
    target: {value}
  });
  expect(wrapper.state('description')).toBe(value);
});
