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
              <li>Date (in MM/DD/YY format)</li>
              <li>Amount</li>
              <li>Category</li>
              <li>Business</li>
              <li>Note</li>
            </ul>
            <h3>Step 2: Upload the correct file</h3>
            <h3>Step 3: Click import</h3>
            <h3>Ensure integrity of information by updating the populated fields</h3>
            <h3>Check and Submit data with buttons at the botton of the page</h3>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  </div>
)
