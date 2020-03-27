import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

export default () => (
  <div className="content-container--subHeader">
    <Accordion>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          How to instructions
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <h3>Step 1: Setup & Save Local CSV file</h3>
            <p>Be sure the csv file has the following headers: </p>
            <ul>
              <li>Date (MM/DD/YY)</li>
              <li>Amount</li>
              <li>Category</li>
              <li>Business</li>
              <li>Note</li>
            </ul>
            <h3>Step 2: Upload the correct file</h3>
            <h3>Step 3: Click import</h3>
            <h3>Step 4: Ensure integrity of information by updating the populated fields</h3>
            <ul>
              <li>Only note is an optional field, all other fields must be completed</li>
              <li>Any edits on an expense must be saved before moving to the next line item.  Otherwise the changes will be lost</li>
              <li>Click on "Check Data" button to ensure all fields are correctly populated</li>
            </ul>
            <h3>Step 5: Once all line items are green the data can be submitted</h3>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  </div>
)
