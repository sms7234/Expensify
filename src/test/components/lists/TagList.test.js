import React from 'react';
import {shallow} from 'enzyme';
import {TagList} from '../../../components/lists/TagList';
import tags from '../../fixtures/tags';

test('should render TagList with tags', () => {
  const wrapper = shallow(<TagList tags={tags} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render TagList with no tags', () => {
  const wrapper = shallow(<TagList tags={[]} />);
  expect(wrapper).toMatchSnapshot();
})
