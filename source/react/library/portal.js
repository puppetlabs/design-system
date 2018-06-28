import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

const propTypes = {
  isOpened: PropTypes.bool,
};

const defaultProps = {
  isOpened: true,
};

// This HOC wraps passed content in a native react portal.
const portal = (Base) => {
  class Portal extends React.Component {
    constructor(props) {
      super(props);

      this.rootSelector = document.body;
      this.container = document.createElement('div');
      this.container.className = 'rc-portal';

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
      const base = <Base { ...this.props } />;

      return ReactDOM.createPortal(base, this.container);
    }
  }

  Portal.propTypes = propTypes;
  Portal.defaultProps = defaultProps;

  return Portal;
};

export default portal;
