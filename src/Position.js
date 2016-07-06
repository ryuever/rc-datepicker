import React, { Component, PropTypes } from 'react';

import {
  unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer
} from 'react-dom';

class Position extends Component {

  constructor (props) {
    super(props);

    this.state = {
      style: {}
    };
  }

  componentDidMount () {
    let elementParentNode = document.createElement('div');
    document.body.appendChild(elementParentNode);
    let style = this.reposition();
    console.log('style : ', style);

    let element = React.createElement('span', {
      className: 'rc-test-child',
      style: style.style
    }, 'hello');
    renderSubtreeIntoContainer(this, element, elementParentNode, () => {
      console.log('finish to append child in document body');
    });

    this.reposition();
  }

  reposition () {
    let field = document.getElementById('datepickerInput');
    var rect = field.getBoundingClientRect();

    var scrollTop = window.pageYOffset;
    var scrollLeft = window.pageXOffset;

    var top = rect.bottom + scrollTop;
    var left = rect.left + scrollLeft;

    return ({
      style: {
        position: 'absolute',
        left: `${left}px`,
        top: `${top}px`
      }
    });
  };

  render () {
    console.log('renderSubtreeIntoContainer : ', renderSubtreeIntoContainer);

    return (
      <span> Text from Position </span>
    );
  }
}

Position.proptypes = {
  name: PropTypes.string
};

export default Position;
