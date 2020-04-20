import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('should setup default filter values', () => {
  const state = filtersReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual({
    account: '',
    category:'',
    business:'',
    note:'',
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

test('should set account text filter', () => {
  const action = {type: 'SET_ACCOUNT', account: 'hi'}
  const state = filtersReducer(undefined, action);
  expect(state.account).toBe('hi');
});

test('should set category text filter', () => {
  const action = {type: 'SET_CATEGORY', category: 'hi'}
  const state = filtersReducer(undefined, action);
  expect(state.category).toBe('hi');
});

test('should set business text filter', () => {
  const action = {type: 'SET_BUSINESS', business: 'hi'}
  const state = filtersReducer(undefined, action);
  expect(state.business).toBe('hi');
});

test('should set note text filter', () => {
  const action = {type: 'SET_NOTE', note: 'hi'}
  const state = filtersReducer(undefined, action);
  expect(state.note).toBe('hi');
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
