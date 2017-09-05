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
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

const prevent = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

class Slider extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.domNode = null;
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  onClick(e) {
    const { max, onChange } = this.props;
    const percent = (e.clientX - offsetLeft(e.currentTarget)) / e.currentTarget.offsetWidth;
    onChange(percent * max);
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
        onClick={this.onClick}
        ref={(node) => { this.domNode = node; }}
        role="button"
        tabIndex="0"
      >
        <div className="slider__bar">
          {max > 0
            ? (
              <div className="slider__bar__fill" style={{ width }}>
                <div
                  className="slider__handle"
                  onClick={prevent}
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
