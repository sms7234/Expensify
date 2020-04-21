export const setTagFilter = (tag='') => ({
  type: 'SET_TAG',
  tag
});

export const setAccountFilter = (account='') => ({
  type: 'SET_ACCOUNT',
  account
});

export const setCategoryFilter = (category='') => ({
  type: 'SET_CATEGORY',
  category
});

export const setBusinessFilter = (business='') => ({
  type: 'SET_BUSINESS',
  business
});

export const setNoteFilter = (note='') => ({
  type: 'SET_NOTE',
  note
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
