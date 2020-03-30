import moment from 'moment';

const filtersReducersDefaultState = {
  category: '',
  business: '',
  note: '',
  sortBy: 'date',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month')
};
export default (state=filtersReducersDefaultState,action) => {
  switch(action.type){
    case 'SET_CATEGORY':
      return { ...state, category: action.category}
    case 'SET_BUSINESS':
      return { ...state, business: action.business}
    case 'SET_NOTE':
      return { ...state, note: action.note}
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
