import React from 'react';
import {shallow} from 'enzyme';
import {CategoryList} from '../../../components/lists/CategoryList';
import categories from '../../fixtures/categories';

test('should render CategoryList with categories', () => {
  const wrapper = shallow(<CategoryList categories={categories} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render CategoryList with no categories', () => {
  const wrapper = shallow(<CategoryList categories={[]} />);
  expect(wrapper).toMatchSnapshot();
})
