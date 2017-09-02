/* global document */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import offsetLeft from '../utils/DomUtils';

const defaultProps = {
  className: '',
};

const propTypes = {
  className: PropTypes.string,
  max: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

class Slider extends Component {
  constructor() {
    super();
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.domNode = null;
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseDown() {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove(e) {
    const { domNode, props } = this;
    const { max, onChange } = props;

    const diff = e.clientX - offsetLeft(domNode);
    const percent = Math.min(Math.max(diff / domNode.offsetWidth, 0), 1);
    onChange(percent * max);
  }

  onMouseUp() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  render() {
    const { className, max, value } = this.props;
    const width = `${(value / max) * 100}%`;

    return (
      <div
        className={`slider ${className}`}
        ref={(node) => { this.domNode = node; }}
      >
        <div className="slider__bar">
          {max > 0
            ? (
              <div className="slider__bar__fill" style={{ width }}>
                <div
                  className="slider__handle"
                  onMouseDown={this.onMouseDown}
                  role="button"
                  tabIndex="0"
                />
              </div>
            ) : null
          }
        </div>
      </div>
    );
  }
}

Slider.defaultProps = defaultProps;
Slider.propTypes = propTypes;

export default Slider;
