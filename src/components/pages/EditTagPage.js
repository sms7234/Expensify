import React from 'react';
import {connect} from 'react-redux';
import TagForm from '../forms/TagForm';
import {startEditTag, startRemoveTag} from '../../actions/tags';

export class EditTagPage extends React.Component{
  onSubmit=(tag)=>{
    this.props.startEditTag(this.props.tags.id, tag),
    this.props.history.push('/tags')
  };
  onRemove= ()=> {
    this.props.startRemoveTag({id: this.props.tags.id}),
    this.props.history.push('/tags')
  };
  render(){
    return(
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title"> Edit Tag</h1>
          </div>
        </div>
        <div className="content-container">
          <TagForm
            tags={this.props.tags}
            onSubmit={this.onSubmit}
          />
          <button className="button--secondary" onClick={this.onRemove}>Remove Tag</button>
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state, props) => {
  return {
    tags: state.tags.find((item) => item.id === props.match.params.id)
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  startEditTag: (id,tag) => dispatch(startEditTag(id,tag)),
  startRemoveTag: (data) => dispatch(startRemoveTag(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTagPage);
