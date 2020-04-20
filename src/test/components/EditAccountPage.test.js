import React from 'react';
import {shallow} from 'enzyme';
import accounts from '../fixtures/accounts';
import {EditAccountPage} from '../../components/EditAccountPage';

let startEditAccount, startRemoveAccount, history, wrapper

beforeEach(()=>{
  startEditAccount = jest.fn();
  startRemoveAccount = jest.fn();
  history = {push: jest.fn()};
  wrapper = shallow(<EditAccountPage startEditAccount={startEditAccount}
  startRemoveAccount={startRemoveAccount}
  history={history}
  accounts={accounts[0]}
/>);
});

test('should render EditAccountPage', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle editing of a account', () => {
  wrapper.find('AccountForm').prop('onSubmit')(accounts[0]);
  expect(history.push).toHaveBeenLastCalledWith('/accounts');
  expect(startEditAccount).toHaveBeenLastCalledWith(accounts[0].id, accounts[0]);
});

test('should handle removal of a account', () => {
  wrapper.find('button').simulate('click');
  expect(history.push).toHaveBeenLastCalledWith('/accounts');
  expect(startRemoveAccount).toHaveBeenLastCalledWith({id: accounts[0].id});
});
