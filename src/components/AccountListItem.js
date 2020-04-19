import React from 'react';
import {Link} from 'react-router-dom';

const AccountListItem = ({dispatch, id, account, description}) => (
  <Link className="list-item" to={`/editAccount/${id}`}>
    <div>
      <h3 className="list-item__title">{account}</h3>
    </div>
    <h3 className="list-item__data">{description}</h3>
  </Link>
);

export default AccountListItem;
