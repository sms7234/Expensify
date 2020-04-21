import React from 'react';
import TagForm from '../forms/TagForm';
import {connect} from 'react-redux';
import {startAddTag} from '../../actions/tags';

export class AddTagPage extends React.Component{
  onSubmit=(tag) => {
    this.props.startAddTag(tag);
    this.props.history.push('/tags');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title"> Add Tag </h1>
          </div>
        </div>
        <div className="content-container">
          <TagForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  };
};

const mapDispatchToProps = (dispatch) => ({
  startAddTag:(tag) => dispatch(startAddTag(tag))
});

export default connect(undefined, mapDispatchToProps)(AddTagPage);
