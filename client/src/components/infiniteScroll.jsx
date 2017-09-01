/* global document */
/* global window */
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const infiniteScroll = (InnerComponent) => {
  const propTypes = {
    onScroll: PropTypes.func.isRequired,
  };

  class InfiniteScrollComponent extends Component {
    constructor(props) {
      super(props);
      this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll() {
      if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 200)) {
        const { onScroll } = this.props;
        onScroll();
      }
    }

    render() {
      return <InnerComponent {...this.props} />;
    }
  }

  InfiniteScrollComponent.propTypes = propTypes;

  return InfiniteScrollComponent;
};

export default infiniteScroll;
