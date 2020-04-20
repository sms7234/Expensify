import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import {Link} from 'react-router-dom';

const ExpenseListItem = ({dispatch, id, category, business, amount, note, purchaseDate}) => (
    <Link className="list-item" to={`/editExpense/${id}`}>
    <div>
      <h3 className="list-item__title">{category} - {business}</h3>
      <span className="list-item__sub-title">{moment(purchaseDate).format("MMMM Do, YYYY")}</span>
    </div>
    <div>
      <h3 className="list-item__data">{numeral(amount/100).format('$0,0.00')}</h3>
      <span className="list-item__sub-title show-for-desktop">{note}</span>
    </div>

    </Link>
)

export default ExpenseListItem;
