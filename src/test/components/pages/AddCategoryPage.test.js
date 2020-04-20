import React from 'react';
import {shallow} from 'enzyme';
import {AddCategoryPage} from '../../../components/pages/AddCategoryPage';
import categories from '../../fixtures/categories';

let startAddCategory, history, wrapper;

beforeEach(()=> {
  startAddCategory = jest.fn();
  history = {push: jest.fn()};
  wrapper = shallow(<AddCategoryPage startAddCategory={startAddCategory} history={history} />);
});

test('should render AddCategoryPage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit',() => {
  wrapper.find('CategoryForm').prop('onSubmit')(categories[0]);
  expect(history.push).toHaveBeenLastCalledWith('/categories');
  expect(startAddCategory).toHaveBeenLastCalledWith(categories[0]);
})
