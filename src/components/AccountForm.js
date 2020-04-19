import React from 'react';

export default class AccountForm extends React.Component{
  constructor(props){
    super(props);
    this.state={
      account: props.accounts ? props.accounts.account: '',
      description: props.accounts ? props.accounts.description:'',
      error:''
    };
  }
  onAccountChange = (e) => {
    const account = e.target.value;
    if(account.length > 0){
      this.setState(()=> ({account}));
    };
  };
  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(()=>({description}))
  };
  onSubmit = (e) => {
    e.preventDefault();
    if(!this.state.account){
      this.setState(()=> ({error: 'Please fill in account'}));
    } else {
      this.setState(()=>({error:''}));
      this.props.onSubmit({
        account: this.state.account,
        description: this.state.description
      })
    }
  };
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error!=='' && <p className="form__error">{this.state.error}</p>}
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
          className="textarea"
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
        <button className="button">
          Save
        </button>
      </form>
    )
  }
}
