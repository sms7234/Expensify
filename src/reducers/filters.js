import moment from 'moment';

const filtersReducersDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month')
};
export default (state=filtersReducersDefaultState,action) => {
  switch(action.type){
    case 'SET_TEXT':
      return { ...state, text: action.text}
    case 'SET_SORTBY':
      return {...state, sortBy: action.sortBy}
    case 'SET_START-DATE':
      return {...state, startDate: action.startDate}
      case 'SET_END-DATE':
        return {...state, endDate: action.endDate}
    default:
    return state;
  };
};
