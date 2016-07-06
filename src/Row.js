import React, { Component, PropTypes } from 'react';
import Cell from './Cell';

class Row extends Component {
  constructor (props) {
    super(props);

    this.state = ({
      activeKey: ''
    });
  }

  handleClick (value) {
    console.log('receive value : ', value);
  }

  render () {
    const { data } = this.props;

    return (
      <div className='table-row'>
        {
          data.map((item, key) => {
            return (
              <Cell
                showName={item.day.toString()}
                handleClick={this.handleClick.bind(this)}
                value={`${item.year}-${item.month}-${item.day}`}
                key={key}/>
            );
          })
        }
      </div>
    );
  }
}

Row.propTypes = {
  data: PropTypes.array
};

export default Row;
