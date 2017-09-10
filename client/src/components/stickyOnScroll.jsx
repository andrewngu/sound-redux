/* global window */
import React, { Component } from 'react';

const stickyOnScroll = (InnerComponent, scrollThreshold) => {
  class StickyOnScrollComponent extends Component {
    constructor(props) {
      super(props);
      this.onScroll = this.onScroll.bind(this);
      this.state = { sticky: false };
    }

    componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll() {
      const { scrollY } = window;
      const { sticky } = this.state;
      const scrolledPastThreshold = scrollY >= scrollThreshold;

      if (scrolledPastThreshold && !sticky) {
        this.setState({ sticky: true });
      } else if (!scrolledPastThreshold && sticky) {
        this.setState({ sticky: false });
      }
    }

    render() {
      const { sticky } = this.state;

      return (
        <InnerComponent
          {...this.props}
          sticky={sticky}
        />
      );
    }
  }

  return StickyOnScrollComponent;
};

export default stickyOnScroll;
