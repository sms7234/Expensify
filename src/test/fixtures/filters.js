import moment from 'moment';

const filters = {
  account:'',
  category: '',
  business:'',
  note:'',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

const altFilters = {
  account: 'BoA',
  category: 'Gum',
  business: 'walmart',
  note: '',
  sortBy: 'amount',
  startDate: moment(),
  endDate: moment(0).add(3, 'days')
};

export {filters, altFilters}
