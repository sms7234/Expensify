import React from 'react';

export class ImportAccountListItem extends React.Component {
  constructor(props){
    super(props);
    this.state={
      index: props.id,
      account: props.Account ? props.Account : '',
      description:props.Description ? props.Description:'',
      buttonSave: true
    }
  }
  onAccountChange = (e) => {
    const account = e.target.value;
    this.setState(() => ({account}));
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
      Account: this.state.account,
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
            placeholder="account name"
            className="text-input"
            value={this.state.account}
            onChange={this.onAccountChange}
            autoFocus
          />
          <textarea
            placeholder="Add description for your account"
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

export default ImportAccountListItem;
