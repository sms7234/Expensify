import React from 'react';
import {shallow} from 'enzyme';
import {AddTagPage} from '../../../components/pages/AddTagPage';
import tags from '../../fixtures/tags';

let startAddTag, history, wrapper;

beforeEach(()=> {
  startAddTag = jest.fn();
  history = {push: jest.fn()};
  wrapper = shallow(<AddTagPage startAddTag={startAddTag} history={history} />);
});

test('should render AddTagPage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit',() => {
  wrapper.find('TagForm').prop('onSubmit')(tags[0]);
  expect(history.push).toHaveBeenLastCalledWith('/tags');
  expect(startAddTag).toHaveBeenLastCalledWith(tags[0]);
})
