import React from 'react';
import {shallow} from 'enzyme';
import {AccountList} from '../../components/AccountList';
import accounts from '../fixtures/accounts';

test('should render AccountList with accounts', () => {
  const wrapper = shallow(<AccountList accounts={accounts} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render AccountList with no accounts', () => {
  const wrapper = shallow(<AccountList accounts={[]} />);
  expect(wrapper).toMatchSnapshot();
})
