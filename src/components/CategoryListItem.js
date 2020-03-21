import React from 'react';
import {Link} from 'react-router-dom';

const CategoryListItem=({dispatch, id, category, description}) =>(
  <Link className="list-item" to={`/add`}>
    <div>
      <h3 className="list-item__title">{category}</h3>
    </div>
    <h3 className="list-item__data">{description}</h3>
  </Link>
)

export default CategoryListItem;
