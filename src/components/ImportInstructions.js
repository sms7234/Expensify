import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

export default (props) => (
  <div className="content-container--subHeader">
    <Accordion>
      <Card>
        <Accordion.Toggle
          as={Card.Header}
          className ="accordion__header"
          eventKey="0">
          How to instructions
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body className="content-container accordion__message">
            <h3>Step 1: Setup & Save Local CSV file</h3>
            <p>Be sure the csv file has the following headers: </p>
            <ul>
              {props.dataFormat.map((item,index) => {return <li key={index}>{item}</li>})}
            </ul>
            <h3>Step 2: Upload the .csv file</h3>
            <h3>Step 3: Click import</h3>
            <h3>Step 4: Ensure integrity of information by updating the populated fields</h3>
            <ul>
              <li>All fieds must be completed, with the exception of note</li>
              <li>Any edits on an expense item must be saved before moving to the next line item.  Otherwise the changes will be lost</li>
              <li>Click on "Check Data" button to ensure all fields are correctly populated.  Be sure to update & save any line items that are highlighted in red.</li>
            </ul>
            <h3>Step 5: Once all line items are green click the submit button</h3>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  </div>
)
