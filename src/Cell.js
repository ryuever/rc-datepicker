import React, { Component, PropTypes } from 'react';
import classname from 'classnames';

export default class Cell extends Component {

  onHandleClick (value) {
    const { handleClick } = this.props;
    handleClick(value);
  }

  render () {
    const {
      showName,
      active,
      disabled,
      value
    } = this.props;

    let cx = classname(active, 'table-cell');

    return (
      <span
        className={cx}
        disabled={disabled}
        onClick={this.onHandleClick.bind(this, value)}>
        <label className='cell'>
          {showName}
        </label>
      </span>
    );
  }
}

Cell.propTypes = {
  active     : PropTypes.bool,
  disabled   : PropTypes.bool,
  handleClick: PropTypes.func,
  showName   : PropTypes.string,
  value      : PropTypes.string
};
