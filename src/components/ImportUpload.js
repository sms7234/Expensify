import React from 'react';
import Papa from 'papaparse';
import moment from 'moment';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card'

const stringToDateConverter=(input) => {
  let date;
  if(input.length===7) {
    date='0'.concat(input.slice(0,1),'-', input.slice(2,4), '-', input.slice(5));
    return moment(Date.parse(date));
  } else if (input.length===8) {
    date=input.slice(0,2).concat('-', input.slice(3,5), '-', input.slice(6));
    return moment(Date.parse(date));
  } else {
    return moment();
  }
};

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
            item.Date = item.Date ? stringToDateConverter(item.Date):moment();
            item.Note = item.Note ? item.Note:'';
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

export default ImportUpload;
