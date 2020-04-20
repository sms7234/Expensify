import React from 'react';
import {connect} from 'react-redux';
import CategoryForm from '../forms/CategoryForm';
import {startEditCategory, startRemoveCategory} from '../../actions/categories';

export class EditCategoryPage extends React.Component{
  onSubmit=(category)=>{
    this.props.startEditCategory(this.props.categories.id, category),
    this.props.history.push('/categories')
  };
  onRemove= ()=> {
    this.props.startRemoveCategory({id: this.props.categories.id}),
    this.props.history.push('/categories')
  };
  render(){
    return(
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title"> Edit Category</h1>
          </div>
        </div>
        <div className="content-container">
          <CategoryForm
            categories={this.props.categories}
            onSubmit={this.onSubmit}
          />
          <button className="button--secondary" onClick={this.onRemove}>Remove Category</button>
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state, props) => {
  return {
    categories: state.categories.find((item) => item.id === props.match.params.id)
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  startEditCategory: (id,category) => dispatch(startEditCategory(id,category)),
  startRemoveCategory: (data) => dispatch(startRemoveCategory(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCategoryPage);
