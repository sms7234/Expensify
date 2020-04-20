import React from  'react';
import {connect} from 'react-redux';
import TwoDataFieldListItem from '../items/TwoDataFieldListItem';
import selectCategories from '../../selectors/categories';


export const CategoryList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Categories</div>
      <div className="show-for-desktop">Categories</div>
      <div className="show-for-desktop">Description</div>
    </div>
    <div className="list-body">
    {
      props.categories.length === 0 ? (
        <div className="list-item--message">
          <span>No categories to show</span>
        </div>
      ): (
        props.categories.map((item) => {return <TwoDataFieldListItem
          key={item.id}
          id={item.id}
          value={item.category}
          description={item.description}
          location={'editCategory'}/>;})
      )
    }
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    categories: selectCategories(state.categories, state.filters)
  };
};

export default connect(mapStateToProps)(CategoryList);