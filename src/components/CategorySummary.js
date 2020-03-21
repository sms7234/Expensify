import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

export const CategorySummary = (props) => {

  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Total number of categories: <span>{props.categories.length}</span></h1>
        <div className="page-header__actions">
          <Link className="button" to="/createCategory">Add Category</Link>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  };
};

export default connect(mapStateToProps)(CategorySummary);
