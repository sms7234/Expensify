import React from 'react';
import CategoryForm from './CategoryForm';
import {connect} from 'react-redux';
import {startAddCategory} from '../actions/categories';

export class AddCategoryPage extends React.Component{
  onSubmit=(category) => {
    this.props.startAddCategory(category);
    this.props.history.push('/categories');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title"> Add Category </h1>
          </div>
        </div>
        <div className="content-container">
          <CategoryForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  };
};

const mapDispatchToProps = (dispatch) => ({
  startAddCategory:(category) => dispatch(startAddCategory(category))
});

export default connect(undefined, mapDispatchToProps)(AddCategoryPage);
