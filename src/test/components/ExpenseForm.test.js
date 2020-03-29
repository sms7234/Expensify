import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import categories from '../fixtures/categories';


test('should render ExpenseForm with no data correctly', () =>{
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
})

test('should render ExpenseForm with expense data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

//testing for category select
test('should set category from dropdown', () =>{
  const wrapper = shallow(<ExpenseForm categoryList={categories}/>);
  expect(wrapper.find('StateManager').prop('options')).toHaveLength(3);
});

test('should set business on input change', () => {
  const value = 'new business'
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: {value}
  });
  expect(wrapper.state('business')).toBe(value);
});

test('should set note on textarea change', () => {
  const value = 'new note'
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('textarea').simulate('change', {
    target: {value}
  });
  expect(wrapper.state('note')).toBe(value);
});

test('should set amount to a valid value', () => {
  const value = '23.50'
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(0).simulate('change', {
    target: {value}
  });
  expect(wrapper.state('amount')).toBe(value);
});

test('should not amount due to invalid data', () => {
  const value = '15.112'
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(0).simulate('change', {
    target: {value}
  });
  expect(wrapper.state('amount')).toBe("");
});

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    category: expenses[0].category,
    business: expenses[0].business,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt
  });
});

test('should set new date on date change', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
  expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus', () => {
  const focused = true;
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({focused});
  expect(wrapper.state('calendarFocused')).toBe(focused);
})
