import React, { Component } from 'react';
import Calendar from './Calendar';

class Datepicker extends Component {

  handleClick () {
    alert('trigger datepicker');
  }

  render () {
    return (
      <div className='rc-datepicker-container'>
        <input
          placeholder='click to choose a date'
          id='datepickerInput'
          onClick={this.handleClick.bind(this)}/>
        <Calendar />
      </div>
    );
  }
}

export default Datepicker;
