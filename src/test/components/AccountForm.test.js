import React from 'react';
import {shallow} from 'enzyme';
import AccountForm from '../../components/AccountForm';
import accounts from '../fixtures/accounts';

test('should render Account Form with no data', () => {
  const wrapper = shallow(<AccountForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render AccountForm with data', () => {
  const wrapper = shallow(<AccountForm account={accounts[0]}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid submission', () => {
  const wrapper = shallow(<AccountForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('should set account value on change', () => {
  const value = "new account";
  const wrapper= shallow(<AccountForm />);
  wrapper.find('input').simulate('change', {
    target: {value}
  });
  expect(wrapper.state('account')).toBe(value);
});

test('should set account value on change', () => {
  const value = "new description";
  const wrapper= shallow(<AccountForm />);
  wrapper.find('textarea').simulate('change', {
    target: {value}
  });
  expect(wrapper.state('description')).toBe(value);
});
