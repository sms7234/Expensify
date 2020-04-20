import React from 'react';
import {shallow} from 'enzyme';
import ImportUploadAccounts from '../../../components/independents/ImportUploadAccounts';


//assuming papaparse input handles data parsing without issue.
//could not test use jest.fn due to call to e

test('test that correct file type upload works (buttonUpload=true, error=str, & file=name)', () => {
  const fakeFile = {
    name: 'blah.csv',
    type: 'text/csv',
    size: 206
  }
  const wrapper = shallow(<ImportUploadAccounts />);
  wrapper.find('input').simulate('change', {target: {files: [fakeFile]}});
  expect(wrapper.state('file')).toEqual(fakeFile);
  expect(wrapper.state('buttonUpload')).toBe(false);
  expect(wrapper.state('error')).toBe('');
  expect(wrapper).toMatchSnapshot();
});

test('test that incorrect file type generates error message', () => {
  const fakeFile = {
    name: 'template.ods',
    type: '"application/vnd.oasis.opendocument.spreadsheet',
    size: 30999
  }
  const wrapper = shallow(<ImportUploadAccounts />);
  wrapper.find('input').simulate('change',{target:{files:[fakeFile]}});
  expect(wrapper.state('error')).toBe('Please upload correct file type');
  expect(wrapper).toMatchSnapshot();
});
