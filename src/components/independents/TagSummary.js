import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

export const TagSummary =({count}) => {
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title"> Tag List </h1>
        <h2 className="page-header__subtitle">Total number of tags: <span>{count}</span></h2>
        <div className="page-header__actions">
          <Link className="button" to="/createTag">Add Tag</Link>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    count: state.tags.length
  };
};

export default connect(mapStateToProps)(TagSummary);
