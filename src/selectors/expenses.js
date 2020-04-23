import moment from 'moment';

export default (expenses, {account, amount, category, business, endDate, note, sortBy, startDate, tag}) => {
  return expenses.filter((item) => {
    const createdAtMoment = moment(item.purchaseDate);
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment,'day') : true;
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
    const accountMatch =  item.account.toLowerCase().includes(account.toLowerCase());
    const categoryMatch =  item.category.toLowerCase().includes(category.toLowerCase());
    const tagMatch =  item.tag.toLowerCase().includes(tag.toLowerCase());
    const businessMatch =  item.business.toLowerCase().includes(business.toLowerCase());
    const noteMatch =  item.note.toLowerCase().includes(note.toLowerCase());

    return startDateMatch && endDateMatch && categoryMatch && businessMatch && noteMatch && tagMatch && accountMatch;
  }).sort((a,b) => {
    if (sortBy === 'date'){
      return a.purchaseDate < b.purchaseDate ? 1 : -1;
    } else if (sortBy === 'amount'){
      return a.amount < b.amount ? 1 : -1;
    }
  });
};
