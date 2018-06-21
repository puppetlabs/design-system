import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { APP_BASE } from '../constants';

const propTypes = {
  isOpened: PropTypes.bool,
  content: PropTypes.element,
};

const defaultProps = {
  isOpened: true,
  content: null,
};

class Portal extends React.Component {
  constructor(props) {
    super(props);

    this.rootSelector = APP_BASE;
    this.container = document.createElement('div');

    // This ensures that components that pre-render aren't appended to the DOM till acted on
    // while components that render after an action is taken are appended immediately
    if (props.isOpened) {
      this.rootSelector.appendChild(this.container);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isOpened && !this.props.isOpened) {
      this.rootSelector.appendChild(this.container);
    } else if (!newProps.isOpened && this.props.isOpened) {
      this.rootSelector.removeChild(this.container);
    }
  }

  componentWillUnmount() {
    this.rootSelector.removeChild(this.container);
  }

  render() {
    return ReactDOM.createPortal(this.props.content, this.container);
  }
}

Portal.propTypes = propTypes;
Portal.defaultProps = defaultProps;

export default Portal;
