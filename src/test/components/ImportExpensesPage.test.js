import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';
import {ImportExpensesPage} from '../../components/ImportExpensesPage';
import categoryList from '../fixtures/categoryList';

const fakeData = [
  {
    Amount: "5.00",
    Category: categoryList[0].value,
    Business: 'Walmart',
    Date: moment(Date.parse('02/14/20')),
    Note: ''
  },
  {
    Amount: "25.00",
    Category: categoryList[1].value,
    Business: 'Chilis',
    Date: moment(Date.parse('02/25/20')),
    Note: 'blah'
  }
];

const altData1=[
  {
    Amount: null,
    Category: null,
    Business: null,
    Date: moment(),
    Note: ''
  }
];

const altData2=[
  {
    Amount: '',
    Category: '',
    Business: '',
    Date: moment(),
    Note: ''
  }
];

test('render page with no data',() => {
  const wrapper = shallow(<ImportExpensesPage />);
  expect(wrapper).toMatchSnapshot();
});

test('test Add data button', () => {
  const newData = [{
    Date: moment(),
    Amount: '',
    Category: '',
    Business: '',
    Note: ''
  }];
  const wrapper = shallow(<ImportExpensesPage categoryList={categoryList}/>);
  wrapper.find('button').at(0).simulate('click');
  expect(wrapper.state('data')).toEqual(newData);
});

test('test check button with correct data', () => {
  const wrapper = shallow(<ImportExpensesPage categoryList={categoryList}/>);
  wrapper.setState({data: fakeData});
  wrapper.setState({validation: [null, null]})
  wrapper.find('button').at(1).simulate('click');
  expect(wrapper.state('buttonSave')).toBe(false);
  const validation = wrapper.state('validation');
  expect(validation.includes(false)).toBe(false);
});

test('test check button with blank imported fields', () => {
  const wrapper = shallow(<ImportExpensesPage categoryList={categoryList}/>);
  wrapper.setState({data: altData1});
  wrapper.setState({validation: [null]})
  wrapper.find('button').at(1).simulate('click');
  expect(wrapper.state('buttonSave')).toBe(true);
  const validation = wrapper.state('validation');
  expect(validation.includes(false)).toBe(true);
})

test('test check button with incorrect amount data', () => {
  const wrapper = shallow(<ImportExpensesPage categoryList={categoryList}/>);
  wrapper.setState({data: altData2});
  wrapper.setState({validation: [null]})
  wrapper.find('button').at(1).simulate('click');
  expect(wrapper.state('buttonSave')).toBe(true);
  const validation = wrapper.state('validation');
  expect(validation.includes(false)).toBe(true);
})

test('test check button with incorrect business data', () => {
  const wrapper = shallow(<ImportExpensesPage categoryList={categoryList}/>);
  wrapper.setState({data: altData2});
  wrapper.setState({validation: [null]})
  wrapper.find('button').at(1).simulate('click');
  expect(wrapper.state('buttonSave')).toBe(true);
  const validation = wrapper.state('validation');
  expect(validation.includes(false)).toBe(true);
})

test('test check button with incorrect category data', () => {
  const wrapper = shallow(<ImportExpensesPage categoryList={categoryList}/>);
  wrapper.setState({data: altData2});
  wrapper.setState({validation: [null]})
  wrapper.find('button').at(1).simulate('click');
  expect(wrapper.state('buttonSave')).toBe(true);
  const validation = wrapper.state('validation');
  expect(validation.includes(false)).toBe(true);
});

test('check that submit function runs', () => {
  const onSubmit = jest.fn()
  const history = {push: jest.fn()};
  const wrapper = shallow(<ImportExpensesPage categoryList={categoryList} startAddExpense={onSubmit} history={history}/>);
  wrapper.setState({data: fakeData});
  wrapper.find('button').at(2).simulate('click');
  expect(onSubmit).toHaveBeenCalled();
  expect(history.push).toHaveBeenLastCalledWith('/expenses');
})
