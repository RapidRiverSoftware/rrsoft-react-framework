// @flow
import React, { Component } from 'react';

/* eslint-disable no-undef */
const doc = process.browser ? document : {};
/* eslint-enable no-undef */

type Props = {
  onClick: Function,
  rootCssSelector?: string,
  children: React.Element<any>,
}

export default class Outside extends Component {
  static defaultProps = {
    rootCssSelector: '',
    onClick: () => {},
  }

  props: Props;
  container: Object;

  componentDidMount() {
    this.rootElement().addEventListener('click', this.handleClick, true);
  }

  componentWillUnmount() {
    this.rootElement().removeEventListener('click', this.handleClick, true);
  }

  rootElement = (): Object => {
    const { rootCssSelector } = this.props;

    if (!rootCssSelector) return doc;

    let customRoot;
    if (rootCssSelector.match(/^#/)) {
      customRoot = document.querySelector(rootCssSelector);
    } else if (rootCssSelector.match(/^\./)) {
      let el = this.container;
      while (el.parentElement && !el.classList.contains(rootCssSelector)) {
        el = el.parentElement;
      }
      customRoot = el;
    }

    if (!customRoot) {
      throw new Error(`No such element ${rootCssSelector} to ClickOutside`);
    }

    return customRoot;
  }

  handleClick = (e: Object) => {
    if (!this.container.contains(e.target)) {
      this.props.onClick(e);
    }
  }

  setContainerRef = (ref: Object) => {
    this.container = ref;
  }

  render() {
    const { onClick, rootCssSelector, children, ...props } = this.props;
    return <div ref={this.setContainerRef} {...props}>{children}</div>;
  }
}
