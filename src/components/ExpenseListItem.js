import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import {Link} from 'react-router-dom';

const ExpenseListItem = ({dispatch, id, category, amount, createdAt}) => (
    <Link className="list-item" to={`/edit/${id}`}>
    <div>
      <h3 className="list-item__title">{category}</h3>
      <span className="list-item__sub-title">{moment(createdAt).format("MMMM Do, YYYY")}</span>
    </div>
    <h3 className="list-item__data">{numeral(amount/100).format('$0,0.00')}</h3>
    </Link>
)

export default ExpenseListItem;
