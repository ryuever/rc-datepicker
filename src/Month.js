import React, { Component, PropTypes } from 'react';
import Row from './Row';
import DateUtil from 'DateUtil';
import { chunk } from 'lodash';

export default class Month extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  createDayData () {
    let { month, year } = this.props;

    let current = new Date();
    if (!month) {
      month = (current.getMonth()) + 1;
    }

    if (!year) {
      year = (current.getFullYear());
    }

    let paddingWeek = DateUtil.paddingWeeksInMonth(year, month);
    let ret = chunk(paddingWeek, 7);

    console.log('ret : ', ret);
    return ret;
  }

  render () {
    let weeks = this.createDayData();
    return (
      <div className='table-group'>
        {
          weeks.map((item, key) => {
            return (
              <Row
                key={key}
                data={item}/>
            );
          })
        }
      </div>
    );
  }
}

Month.propTypes = {
  month: PropTypes.string,
  year : PropTypes.string
};
