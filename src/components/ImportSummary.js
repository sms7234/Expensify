import React from 'react';

const ImportSummary = (props) => (
  <div className="content-container">
    <div className="page-header__subtitle">
      {(!props.qty || props.qty.length===0)? (null) : (<h2><span>{props.qty.length}</span> new expenses to be uploaded</h2>)}
    </div>
  </div>
);

export default ImportSummary;
