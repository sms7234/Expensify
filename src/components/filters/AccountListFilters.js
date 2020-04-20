import React from 'react';
import {connect} from 'react-redux';
import {setAccountFilter} from '../../actions/filters';

export class AccountListFilters extends React.Component {
  onTextChange = (e) => {
    this.props.setAccountFilter(e.target.value);
  };
  render () {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              type="text"
              className="text-input"
              placeholder="search accounts"
              value={this.props.filters.account}
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
  setAccountFilter: (text) => dispatch(setAccountFilter(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountListFilters);
