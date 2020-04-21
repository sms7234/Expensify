import React from  'react';
import {connect} from 'react-redux';
import TwoDataFieldListItem from '../items/TwoDataFieldListItem';
import selectTags from '../../selectors/tags';


export const TagList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Tags</div>
      <div className="show-for-desktop">Tags</div>
      <div className="show-for-desktop">Description</div>
    </div>
    <div className="list-body">
    {
      props.tags.length === 0 ? (
        <div className="list-item--message">
          <span>No tags to show</span>
        </div>
      ): (
        props.tags.map((item) => {return <TwoDataFieldListItem
       key={item.id}
       id={item.id}
       value={item.tag}
       description={item.description}
       location={'editTag'}/>;})
      )
    }
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    tags: selectTags(state.tags, state.filters)
  };
};

export default connect(mapStateToProps)(TagList);
