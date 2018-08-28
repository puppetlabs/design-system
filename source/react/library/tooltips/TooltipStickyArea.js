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
    const { open: openState } = this.state;
    const { open: openProp } = props;

    if (openProp !== openState) {
      this.setState({ open: openProp });
    }
  }

  onClose() {
    const { onClose } = this.props;

    this.setState({ open: false }, () => {
      if (onClose) {
        onClose();
      }
    });
  }

  renderTooltip() {
    if (!this.elem) {
      return null;
    }

    const { anchor, tooltip } = this.props;

    return (
      <Tooltip sticky target={this.elem} anchor={anchor} onClose={this.onClose}>
        {tooltip}
      </Tooltip>
    );
  }

  render() {
    const tooltip = this.renderTooltip();
    const { open, children } = this.state;

    return (
      <div
        className="rc-tooltip-area rc-tooltip-area-sticky"
        ref={c => {
          this.elem = c;
        }}
        {...this.props}
      >
        <FadeInAndOut in={open}>{tooltip}</FadeInAndOut>
        {children}
      </div>
    );
  }
}

TooltipStickyArea.propTypes = propTypes;
TooltipStickyArea.defaultProps = defaultProps;

export default TooltipStickyArea;
