import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

export const CategorySummary = ({count}) => {

  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title"> Category List </h1>
        <h2 className="page-header__subtitle">Total number of categories: <span>{count}</span></h2>
        <div className="page-header__actions">
          <Link className="button" to="/createCategory">Add Category</Link>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    count: state.categories.length
  };
};

export default connect(mapStateToProps)(CategorySummary);
