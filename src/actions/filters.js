export const setTextFilter = (text='') => ({
  type: 'SET_TEXT',
  text
});

export const sortByAmount = () => ({
  type: 'SET_SORTBY',
  sortBy: 'amount'
});

export const sortByDate = () => ({
  type: 'SET_SORTBY',
  sortBy: 'date'
});

export const setStartDate = (startDate) => ({
  type: 'SET_START-DATE',
  startDate
});

export const setEndDate = (endDate) => ({
  type: 'SET_END-DATE',
  endDate
});
