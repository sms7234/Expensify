import React from 'react';

export default class TagForm extends React.Component{
  constructor(props){
    super(props);
    this.state={
      tag: props.tags ? props.tags.tag: '',
      description: props.tags ? props.tags.description:'',
      error:''
    };
  }
  onTagChange = (e) => {
    const tag = e.target.value;
    if(tag.length > 0){
      this.setState(()=> ({tag}));
    };
  };
  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(()=>({description}))
  };
  onSubmit = (e) => {
    e.preventDefault();
    if(!this.state.tag){
      this.setState(()=> ({error: 'Please fill in tag'}));
    } else {
      this.setState(()=>({error:''}));
      this.props.onSubmit({
        tag: this.state.tag,
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
          placeholder="tag name"
          className="text-input"
          value={this.state.tag}
          onChange={this.onTagChange}
          autoFocus
        />
        <textarea
          placeholder="Add description for your tag"
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
