import React from 'react';
import Papa from 'papaparse';

class ImportUpload extends React.Component {
  constructor(props){
    super(props);
    this.state={
      data:this.props.data,
      validation:this.props.validation,
      buttonUpload: true,
      file: null,
      error:''
    };
  };
  onFileUpload = (e)=>{
    const file = e.target.files[0];
    if (file.name.match(/\.csv$/)){
      this.setState(()=> ({
        file,
        error:'',
        buttonUpload: false
      }))
    } else {
      this.setState(()=> ({
        error: 'Please upload correct file type'
      }))
    }
  };
  onDataUpload=(e)=>{
    e.preventDefault();
    if (this.state.error==='') {
      Papa.parse(this.state.file,{
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          const data = this.state.data;
          const validation = this.state.validation;
          results.data.forEach((item) => {
            data.push(item);
            validation.push(null);
          })
          this.props.onDataUpload(data, validation);
          this.setState(()=>({buttonUpload: true}));
        },
        error: (err) => {
          this.setState(()=>{error: 'Error during parse: ', err.type})
        }
      });
    }
  };
  render () {
    return (
      <form className="form" onSubmit={this.onDataUpload}>
        {this.state.error!=='' && <h3 className="form__error">{this.state.error}</h3>}
        <input
          type="file"
          name="file"
          onChange={this.onFileUpload}
        />
        <div>
          <button className="button" disabled={this.state.buttonUpload}>
            Upload Data
          </button>
        </div>
      </form>
    )
  }
}

export default ImportUpload;
