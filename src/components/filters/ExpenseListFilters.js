import React from 'react';
import {connect} from 'react-redux';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import {setCategoryFilter, setBusinessFilter, setNoteFilter} from '../../actions/filters';
import {sortByAmount, sortByDate, setStartDate, setEndDate} from '../../actions/filters';
import {DateRangePicker} from 'react-dates';

export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null
  };
  onDatesChange = ({startDate, endDate}) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({calendarFocused}))
  };
  onSortChange = (e) => {
    if(e.target.value ==="amount") {
      this.props.sortByAmount();
    }else if (e.target.value ==="date") {
      this.props.sortByDate();
    }
  };
  onCategoryChange = (e) => {
    this.props.setCategoryFilter(e.target.value);
  };
  onBusinessChange = (e) => {
    this.props.setBusinessFilter(e.target.value);
  };
  onNoteChange = (e) => {
    this.props.setNoteFilter(e.target.value);
  };
  render() {
    return (
      <div className="content-container accordion__filters">
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
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} className="accordion__header" eventKey="0">
            Additional Filters
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <div className="input-group">
                <div className="input-group--filters">
                  <div className="input-group__item">
                    <input type = "text"
                      className="text-input--filters"
                      placeholder="search categories"
                      value={this.props.filters.category} onChange={this.onCategoryChange}/>
                  </div>
                  <div className="input-group__item">
                    <input type = "text"
                      className="text-input--filters"
                      placeholder="search business"
                      value={this.props.filters.business} onChange={this.onBusinessChange}/>
                  </div>
                  <div>
                    <div className="input-group__item">
                      <input type = "text"
                        className="text-input--filters"
                        placeholder="search notes"
                        value={this.props.filters.note} onChange={this.onNoteChange}/>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="input-group__item">
                    <select
                      className="select"
                      value={this.props.filters.sortBy}
                      onChange={this.onSortChange}>
                      <option value="date">Date</option>
                      <option value="amount">Amount</option>
                    </select>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
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
  setCategoryFilter: (text) => dispatch(setCategoryFilter(text)),
  setBusinessFilter: (text) => dispatch(setBusinessFilter(text)),
  setNoteFilter: (text) => dispatch(setNoteFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
