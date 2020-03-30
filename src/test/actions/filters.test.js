import moment from 'moment';
import {setStartDate, setEndDate, sortByAmount, sortByDate, setCategoryFilter, setBusinessFilter, setNoteFilter} from '../../actions/filters';

test('should generate set start date action object', () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: 'SET_START-DATE',
    startDate: moment(0)
  });
});

test('should generate the set end date action object', () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({
    type: 'SET_END-DATE',
    endDate: moment(0)
  })
});

test('should generate sortByAmount object', () => {
  const action = sortByAmount();
  expect(action).toEqual({
    type: 'SET_SORTBY',
    sortBy: 'amount'
  })
});

test('should generate sortByDate object', () => {
  const action = sortByDate();
  expect(action).toEqual({
    type: 'SET_SORTBY',
    sortBy: 'date'
  })
});


test('should generate search category object with text input', () => {
  const action = setCategoryFilter('thisText');
  expect(action).toEqual({
    type: 'SET_CATEGORY',
    category: 'thisText'
  })
});

test('should generate search business object with text input', () => {
  const action = setBusinessFilter('thisText');
  expect(action).toEqual({
    type: 'SET_BUSINESS',
    business: 'thisText'
  })
});

test('should generate search note object with text input', () => {
  const action = setNoteFilter('thisText');
  expect(action).toEqual({
    type: 'SET_NOTE',
    note: 'thisText'
  })
});

test('should generate search category object for category with NO input', () => {
  const action = setCategoryFilter();
  expect(action).toEqual({
    type: 'SET_CATEGORY',
    category: ''
  })
});

test('should generate search business object with NO input', () => {
  const action = setBusinessFilter();
  expect(action).toEqual({
    type: 'SET_BUSINESS',
    business: ''
  })
});

test('should generate search note object with NO input', () => {
  const action = setNoteFilter();
  expect(action).toEqual({
    type: 'SET_NOTE',
    note: ''
  })
});
