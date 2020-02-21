import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('should setup default filter values', () => {
  const state = filtersReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual({
    text:'',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('should set sortBy to amount', () => {
  const state = filtersReducer(undefined, {type: 'SET_SORTBY', sortBy: 'amount'});
  expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
  const currentState = {
    text:'',
    startDate: undefined,
    endDate: undefined,
    sortBy: 'amount'
  };
  const action = {type: 'SET_SORTBY', sortBy:'date'};
  const state = filtersReducer(currentState,action);
  expect(state.sortBy).toBe('date');
})

test('should set text filter', () => {
  const action = {type: 'SET_TEXT', text: 'hi'}
  const state = filtersReducer(undefined, action);
  expect(state.text).toBe('hi');
});

test('should set start date filter', () => {
  const action = {type: 'SET_START-DATE', startDate: moment(0).valueOf()}
  const state = filtersReducer(undefined, action);
  expect(state.startDate).toBe(moment(0).valueOf());
});

test('should set end date filter', () => {
  const action = {type: 'SET_END-DATE', endDate: moment(0).valueOf()}
  const state = filtersReducer(undefined, action);
  expect(state.endDate).toBe(moment(0).valueOf());
});
