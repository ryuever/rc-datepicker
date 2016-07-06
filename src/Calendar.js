import React, { Component, PropTypes } from 'react';
import CalendarNav from './CalendarNav';
import Month from './Month';

// import CalendarTitle from 'CalendarTitle';
// import Month from 'Month';

export default class Calendar extends Component {
  constructor (props) {
    super(props);

    let cur = new Date();
    let year = cur.getFullYear();
    let month = cur.getMonth() + 1;

    this.state = {
      selectedYear : year,
      selectedMonth: month,
      previewYear  : '',
      previewMonth : ''
    };
  }

  onMonthChange (month, year) {
    console.log('select month year : ', month, year);
    this.setState({
      selectedMonth: month,
      selectedYear : year
    });
  }

  render () {
    let { selectedYear, selectedMonth } = this.state;

    return (
      <div className='rc-datepicker-calendar-panel'>
        <CalendarNav
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          onMonthChange={this.onMonthChange.bind(this)}/>
        <Month
          month={selectedMonth}
          year={selectedYear}/>
      </div>
    );
  }
}

Calendar.proptypes = {
  name: PropTypes.string
};
