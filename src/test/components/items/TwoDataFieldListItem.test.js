import React from 'react';
import {shallow} from 'enzyme';
import TwoDataFieldListItem from '../../../components/items/TwoDataFieldListItem';
import accounts from '../../fixtures/accounts';
import categories from '../../fixtures/categories';
import tags from '../../fixtures/tags';

test('should render TwoDataFieldListItem with one item from accounts', () => {
  const wrapper = shallow(<TwoDataFieldListItem key={accounts[0].id}
  id={accounts[0].id}
  value={accounts[0].account}
  description={accounts[0].description}
  location={'editAccount'}
  />)
  expect(wrapper).toMatchSnapshot();
})

test('should render TwoDataFieldListItem with one item from category', () => {
  const wrapper = shallow(<TwoDataFieldListItem key={categories[0].id}
  id={categories[0].id}
  value={categories[0].category}
  description={categories[0].description}
  location={'editCategory'}
  />)
  expect(wrapper).toMatchSnapshot();
})

test('should render TwoDataFieldListItem with one item from tags', () => {
  const wrapper = shallow(<TwoDataFieldListItem key={tags[0].id}
  id={tags[0].id}
  value={tags[0].tag}
  description={tags[0].description}
  location={'editTag'}
  />)
  expect(wrapper).toMatchSnapshot();
})
