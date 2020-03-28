import React from 'react';

const ImportSummary = (props) => (
  <div>
    {
      (!props.qty || props.qty.length===0)? (null) : (<h1 className="page-header__message"><span>{props.qty.length}</span> new {(props.qty.length===1)?'expense':'expenses'} to be uploaded</h1>)
    }
  </div>
);

export default ImportSummary;
