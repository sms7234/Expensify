import moment from 'moment';
import {setStartDate, setEndDate, sortByAmount, sortByDate, setTextFilter} from '../../actions/filters';

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


test('should generate search text object with input', () => {
  const action = setTextFilter('thisText');
  expect(action).toEqual({
    type: 'SET_TEXT',
    text: 'thisText'
  })
});

test('should generate search text object with NO input', () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: 'SET_TEXT',
    text: ''
  })
});
