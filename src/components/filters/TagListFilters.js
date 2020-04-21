import React from 'react';
import {connect} from 'react-redux';
import {setTagFilter} from '../../actions/filters';

export class TagListFilters extends React.Component {
  onTextChange = (e) => {
    this.props.setTagFilter(e.target.value);
  };
  render () {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              type="text"
              className="text-input"
              placeholder="search tags"
              value={this.props.filters.tag}
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
  setTagFilter: (text) => dispatch(setTagFilter(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TagListFilters);
