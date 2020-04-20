import React from 'react';
import Papa from 'papaparse';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card'

class ImportUploadAccounts extends React.Component {
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
            item.Account = item.Account ? item.Account:'';
            item.Description = item.Description ? item.Description:'';
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
      <div className="content-container--subHeader">
        <Accordion>
          <Card>
            <Accordion.Toggle as={Card.Header} className="accordion__header" eventKey="0">
              Upload Data
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
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
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    )
  }
}

export default ImportUploadAccounts;
