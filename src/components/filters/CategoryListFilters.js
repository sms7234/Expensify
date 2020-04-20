import React from 'react';
import {connect} from 'react-redux';
import {setCategoryFilter} from '../../actions/filters';

export class CategoryListFilters extends React.Component {
  onTextChange = (e) => {
    this.props.setCategoryFilter(e.target.value);
  };
  render () {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              type="text"
              className="text-input"
              placeholder="search categories"
              value={this.props.filters.category}
              onChange={this.onTextChange}
            />
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  };
};

const mapDispatchToProps = (dispatch) => ({
  setCategoryFilter: (text) => dispatch(setCategoryFilter(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryListFilters);
