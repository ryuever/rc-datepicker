import React, { Component, PropTypes } from 'react';
import DateUtil from 'DateUtil';

export default class CalendarNav extends Component {

  handleClick (indicator) {
    const {
      selectedMonth,
      selectedYear,
      onMonthChange
     } = this.props;

    let parts = indicator.split('.');
    let unit = parts[0];
    let property = parts[1];

    let date = new Date(selectedYear, parseInt(selectedMonth) - 1, 1);
    console.log('date : ', date);

    let deltaDateInt = DateUtil.parseDeltaDateStringToDate(unit, {
      date: date,
      flag: parseInt(property)
    });

    onMonthChange(deltaDateInt.getMonth() + 1, deltaDateInt.getFullYear());
  }

  render () {
    const { selectedMonth, selectedYear } = this.props;

    return (
      <div className='calendar-nav-bar'>
        <span
          className='prev-year icon'
          onClick={this.handleClick.bind(this, '1y.0')}>{'\u00AB'}</span>
        <span
          className='prev-month icon'
          onClick={this.handleClick.bind(this, '1m.0')}>{'\u003C'}</span>
        <span
          className='current-year-month'>{`${selectedYear}-${selectedMonth}`}</span>
        <span
          className='next-month icon'
          onClick={this.handleClick.bind(this, '1m.1')}>{'\u003E'}</span>
        <span
          className='next-year icon'
          onClick={this.handleClick.bind(this, '1y.1')}>{'\u00BB'}</span>
      </div>
    );
  }
}

CalendarNav.propTypes = {
  isEditable   : PropTypes.bool,
  onMonthChange: PropTypes.func,
  selectedMonth: PropTypes.string,
  selectedYear : PropTypes.string
};
