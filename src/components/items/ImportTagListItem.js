import React from 'react';

export class ImportTagListItem extends React.Component {
  constructor(props){
    super(props);
    this.state={
      index: props.id,
      tag: props.Tag ? props.Tag : '',
      description:props.Description ? props.Description:'',
      buttonSave: true
    }
  }
  onTagChange = (e) => {
    const tag = e.target.value;
    this.setState(() => ({tag}));
    if (this.state.buttonSave){
      this.setState(()=>({buttonSave:false}))
    };
  };
  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(()=>({description}));
    if (this.state.buttonSave){
      this.setState(()=>({buttonSave:false}))
    };
  };
  onRemove = () => {
    this.props.onRemove(this.state.index);
  }
  onSave=() => {
    const update = {
      Tag: this.state.tag,
      Description: this.state.description,
    }
    this.props.onSave(update, this.state.index);
    this.setState(()=>({buttonSave:true}));
  }
  render() {
    return (
      <div>
        <div className={"group-listing " + (this.props.validation===false ? "list-item--invalid ":"")+ (this.props.validation===true ? "list-item--valid ":"")}>
          <input
            type="text"
            placeholder="tag name"
            className="text-input"
            value={this.state.tag}
            onChange={this.onTagChange}
            autoFocus
          />
          <textarea
            placeholder="Add description for your tag"
            className="textarea--multiple"
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <button className="button--group button--secondary" onClick={this.onRemove}>
            Remove
          </button>
          <button
            disabled={this.state.buttonSave}
            className="button button--group"
            onClick={this.onSave}>
            Save
          </button>
        </div>
      </div>
    )
  }
}

export default ImportTagListItem;
