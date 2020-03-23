import React from 'react';
import {shallow} from 'enzyme';
import categories from '../fixtures/categories';
import {EditCategoryPage} from '../../components/EditCategoryPage';

let startEditCategory, startRemoveCategory, history, wrapper

beforeEach(()=>{
  startEditCategory = jest.fn();
  startRemoveCategory = jest.fn();
  history = {push: jest.fn()};
  wrapper = shallow(<EditCategoryPage startEditCategory={startEditCategory}
  startRemoveCategory={startRemoveCategory}
  history={history}
  categories={categories[0]}
/>);
});

test('should render EditCategoryPage', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle editing of a category', () => {
  wrapper.find('CategoryForm').prop('onSubmit')(categories[0]);
  expect(history.push).toHaveBeenLastCalledWith('/categories');
  expect(startEditCategory).toHaveBeenLastCalledWith(categories[0].id, categories[0]);
});

test('should handle removal of a category', () => {
  wrapper.find('button').simulate('click');
  expect(history.push).toHaveBeenLastCalledWith('/categories');
  expect(startRemoveCategory).toHaveBeenLastCalledWith({id: categories[0].id});
});
