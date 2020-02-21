import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';

const ExpenseListItem = ({dispatch, id, description, amount, createdAt}) => (
  <div>
    <Link to={`/edit/${id}`}>
      <p>Expense: {description}</p>
    </Link>
    <ul>
      <li>Amount: {amount}</li>
      <li>Date Created: {moment(createdAt).format("MM/DD/YYYY")}</li>
    </ul>
  </div>
)

export default ExpenseListItem;
