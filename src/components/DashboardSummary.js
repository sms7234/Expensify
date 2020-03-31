import React from 'react';
import {connect} from 'react-redux';
import numeral from 'numeral';


const  DashboardSummary = ({income, expenses}) => {
  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title"> Budgeting Dashboard </h1>
          <div className="content-container">
            <h2 className="page-header__subtitle">In the timeframe, specified below, you have earned <span> {numeral(income).format('$0,0.00')} </span> and spent <span> {numeral(expenses).format('$0,0.00')} </span></h2>
            <h2 className="page-header__subtitle">Remianing Funds: <span>{numeral(income - expenses).format('$0,0.00')}</span></h2>

          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardSummary;
