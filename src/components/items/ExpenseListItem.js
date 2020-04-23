import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import {Link} from 'react-router-dom';

const ExpenseListItem = ({dispatch, id, account, category, business, amount, note, purchaseDate, tag}) => (
    <Link className="list-item" to={`/editExpense/${id}`}>
    <div>
      <h3 className="list-item__title">{category} - {business}</h3>
      <h4 className="list-item__title">{account} - {tag}</h4>
      <span className="list-item__sub-title">{moment(purchaseDate).format("MMMM Do, YYYY")}</span>
    </div>
    <div>
      <h3 className="list-item__data">{numeral(amount/100).format('$0,0.00')}</h3>
      <span className="list-item__sub-title show-for-desktop">{note}</span>
    </div>

    </Link>
)

export default ExpenseListItem;
