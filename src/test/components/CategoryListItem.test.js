import React from 'react';
import {shallow} from 'enzyme';
import CategoryListItem from '../../components/CategoryListItem';
import categories from '../fixtures/categories';

test('should render CategoryListItem with one item', () => {
  const wrapper = shallow(<CategoryListItem key={categories[0].id}{...categories[0]} />)
  expect(wrapper).toMatchSnapshot();
})
