import React from 'react';
import {Link} from 'react-router-dom';

const CategoryListItem=({dispatch, id, value, description, location}) =>(
  <Link className="list-item" to={`/${location}/${id}`}>
    <div>
      <h3 className="list-item__title">{value}</h3>
    </div>
    <h3 className="list-item__data">{description}</h3>
  </Link>
)

export default CategoryListItem;
