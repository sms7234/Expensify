import React from 'react';
import {shallow} from 'enzyme';
import tags from '../../fixtures/tags';
import {EditTagPage} from '../../../components/pages/EditTagPage';

let startEditTag, startRemoveTag, history, wrapper

beforeEach(()=>{
  startEditTag = jest.fn();
  startRemoveTag = jest.fn();
  history = {push: jest.fn()};
  wrapper = shallow(<EditTagPage startEditTag={startEditTag}
  startRemoveTag={startRemoveTag}
  history={history}
  tags={tags[0]}
/>);
});

test('should render EditTagPage', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle editing of a tag', () => {
  wrapper.find('TagForm').prop('onSubmit')(tags[0]);
  expect(history.push).toHaveBeenLastCalledWith('/tags');
  expect(startEditTag).toHaveBeenLastCalledWith(tags[0].id, tags[0]);
});

test('should handle removal of a tag', () => {
  wrapper.find('button').simulate('click');
  expect(history.push).toHaveBeenLastCalledWith('/tags');
  expect(startRemoveTag).toHaveBeenLastCalledWith({id: tags[0].id});
});
