import React from 'react';

export class ImportExpenseListItem extends React.Component {
  constructor(props){
    super(props);
    this.state={
      index: props.id,
      category: props.Category ? props.Category : '',
      description:props.Description ? props.Description:'',
      buttonSave: true
    }
  }
  onCategoryChange = (e) => {
    const category = e.target.value;
    this.setState(() => ({category}));
    if (this.state.buttonSave){
      this.setState(()=>({buttonSave:false}))
    };
  };
  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(()=>({description}));
  };
  onRemove = () => {
    this.props.onRemove(this.state.index);
  }
  onSave=() => {
    const update = {
      Category: this.state.category,
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
            placeholder="category name"
            className="text-input"
            value={this.state.category}
            onChange={this.onCategoryChange}
            autoFocus
          />
          <textarea
            placeholder="Add description for your category"
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

export default ImportExpenseListItem;
