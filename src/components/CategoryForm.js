import React from 'react';

export default class CategoryForm extends React.Component{
  constructor(props){
    super(props);
    this.state={
      category: props.categories ? props.categories.category: '',
      description: props.categories ? props.categories.description:'',
      error:''
    };
  }
  onCategoryChange = (e) => {
    const category = e.target.value;
    if(category.length > 0){
      this.setState(()=> ({category}));
    };
  };
  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(()=>({description}))
  };
  onSubmit = (e) => {
    e.preventDefault();
    if(!this.state.category){
      this.setState(()=> ({error: 'Please fill in category'}));
    } else {
      this.setState(()=>({error:''}));
      this.props.onSubmit({
        category: this.state.category,
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
          placeholder="category name"
          className="text-input"
          value={this.state.category}
          onChange={this.onCategoryChange}
          autoFocus
        />
        <textarea
          placeholder="Add description for your category"
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
