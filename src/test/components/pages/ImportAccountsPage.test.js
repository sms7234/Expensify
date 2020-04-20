import React from 'react';
import {shallow} from 'enzyme';
import {ImportAccountsPage} from '../../../components/pages/ImportAccountsPage';

const fakeData = [
  {
    Account: 'Groceries',
    Description: ''
  },
  {
    Account: 'Healthcare',
    Description: 'blah'
  }
];

const altData1=[
  {
    Account: '',
    Description: ''
  }
];


test('render page with no data',() => {
  const wrapper = shallow(<ImportAccountsPage />);
  expect(wrapper).toMatchSnapshot();
});

test('test Add data button', () => {
  const wrapper = shallow(<ImportAccountsPage />);
  wrapper.find('button').at(0).simulate('click');
  expect(wrapper.state('data')).toEqual([{
    Account: '',
    Description: ''
  }]);
});

test('test check button with correct data', () => {
  const wrapper = shallow(<ImportAccountsPage />);
  wrapper.setState({data: fakeData});
  wrapper.setState({validation: [null, null]})
  wrapper.find('button').at(1).simulate('click');
  expect(wrapper.state('buttonSave')).toBe(false);
  const validation = wrapper.state('validation');
  expect(validation.includes(false)).toBe(false);
});

test('test check button with blank imported fields', () => {
  const wrapper = shallow(<ImportAccountsPage />);
  wrapper.setState({data: altData1});
  wrapper.setState({validation: [null]})
  wrapper.find('button').at(1).simulate('click');
  expect(wrapper.state('buttonSave')).toBe(true);
  const validation = wrapper.state('validation');
  expect(validation.includes(false)).toBe(true);
})

test('check that submit function runs', () => {
  const onSubmit = jest.fn()
  const history = {push: jest.fn()};
  const wrapper = shallow(<ImportAccountsPage startAddAccount={onSubmit} history={history}/>);
  wrapper.setState({data: fakeData});
  wrapper.find('button').at(2).simulate('click');
  expect(onSubmit).toHaveBeenCalled();
  expect(history.push).toHaveBeenLastCalledWith('/accounts');
})
