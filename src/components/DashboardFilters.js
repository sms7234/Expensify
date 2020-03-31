import React from 'react';
import {connect} from 'react-redux';
import {setStartDate, setEndDate} from '../actions/filters';
import {DateRangePicker} from 'react-dates';

export class DashboardFilters extends React.Component {
  state = {
    calendarFocused: null
  }
  onDatesChange = ({startDate, endDate}) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({calendarFocused}))
  };
  render() {
    return (
      <div className="input-group__item">
        <DateRangePicker
          startDate={this.props.filters.startDate}
          endDate={this.props.filters.endDate}
          startDateId="dasewqeqwe"
          endDateId="jijhjkyjyihi"
          onDatesChange={this.onDatesChange}
          focusedInput = {this.state.calendarFocused}
          onFocusChange = {this.onFocusChange}
          isOutsideRange = {() => false}
          numberOfMonths = {1}
          showClearDates={true}
        />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  };
};

const mapDispatchToProps = (dispatch) => ({
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardFilters);
