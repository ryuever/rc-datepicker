import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Day from './Day';
import Datepicker from 'Datepicker';

require('Sample/dist/sample.css');

class App extends Component {
  render () {
    return (
      <div className='app-testing'>
        <Day />
        <Datepicker />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#app')
);
