import moment from 'moment';

const filters = {
  account:'',
  category: '',
  business:'',
  note:'',
  tag:'',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

const altFilters = {
  account: 'Bank',
  category: 'Gum',
  business: 'walmart',
  tag:'',
  note: '',
  sortBy: 'amount',
  startDate: moment(),
  endDate: moment(0).add(3, 'days')
};

export {filters, altFilters}
