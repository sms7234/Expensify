import React from 'react';
import {shallow} from 'enzyme';
import AccountListItem from '../../../components/items/AccountListItem';
import accounts from '../../fixtures/accounts';

test('should render AccountListItem with one item', () => {
  const wrapper = shallow(<AccountListItem key={accounts[0].id}{...accounts[0]} />)
  expect(wrapper).toMatchSnapshot();
})
