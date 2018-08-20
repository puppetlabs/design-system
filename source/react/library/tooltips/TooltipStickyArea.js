import PropTypes from 'prop-types';
import React from 'react';

import Tooltip from './Tooltip';
import FadeInAndOut from '../FadeInAndOut';

const propTypes = {
  anchor: PropTypes.string,
  open: PropTypes.bool,
  tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
};

const defaultProps = {
  anchor: 'bottom',
  open: false,
  onClose: null,
};

/**
 * `TooltipStickyArea` allows you to define where a static tooltip should
 * be positioned.
 */

class TooltipStickyArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: props.open };

    this.onClose = this.onClose.bind(this);
  }

  componentDidMount() {
    this.setState({ open: true }); // eslint-disable-line react/no-did-mount-set-state
  }

  componentWillReceiveProps(props) {
    if (props.open !== this.state.open) {
      this.setState({ open: props.open });
    }
  }

  onClose() {
    this.setState({ open: false }, () => {
      if (this.props.onClose) {
        this.props.onClose();
      }
    });
  }

  renderTooltip() {
    if (!this.elem) {
      return null;
    }

    return (
      <Tooltip
        sticky
        target={this.elem}
        anchor={this.props.anchor}
        onClose={this.onClose}
      >
        {this.props.tooltip}
      </Tooltip>
    );
  }

  render() {
    const tooltip = this.renderTooltip();

    return (
      <div
        className="rc-tooltip-area rc-tooltip-area-sticky"
        ref={c => {
          this.elem = c;
        }}
        {...this.props}
      >
        <FadeInAndOut in={this.state.open}>{tooltip}</FadeInAndOut>
        {this.props.children}
      </div>
    );
  }
}

TooltipStickyArea.propTypes = propTypes;
TooltipStickyArea.defaultProps = defaultProps;

export default TooltipStickyArea;
