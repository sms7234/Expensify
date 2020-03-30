import React from 'react';
import {shallow} from 'enzyme';
import {ImportCategoriesPage} from '../../components/ImportCategoriesPage';

const fakeData = [
  {
    Category: 'Groceries',
    Description: ''
  },
  {
    Category: 'Healthcare',
    Description: 'blah'
  }
];

const altData1=[
  {
    Category: '',
    Description: ''
  }
];


test('render page with no data',() => {
  const wrapper = shallow(<ImportCategoriesPage />);
  expect(wrapper).toMatchSnapshot();
});

test('test Add data button', () => {
  const wrapper = shallow(<ImportCategoriesPage />);
  wrapper.find('button').at(0).simulate('click');
  expect(wrapper.state('data')).toEqual([{
    Category: '',
    Description: ''
  }]);
});

test('test check button with correct data', () => {
  const wrapper = shallow(<ImportCategoriesPage />);
  wrapper.setState({data: fakeData});
  wrapper.setState({validation: [null, null]})
  wrapper.find('button').at(1).simulate('click');
  expect(wrapper.state('buttonSave')).toBe(false);
  const validation = wrapper.state('validation');
  expect(validation.includes(false)).toBe(false);
});

test('test check button with blank imported fields', () => {
  const wrapper = shallow(<ImportCategoriesPage />);
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
  const wrapper = shallow(<ImportCategoriesPage startAddCategory={onSubmit} history={history}/>);
  wrapper.setState({data: fakeData});
  wrapper.find('button').at(2).simulate('click');
  expect(onSubmit).toHaveBeenCalled();
  expect(history.push).toHaveBeenLastCalledWith('/categories');
})
