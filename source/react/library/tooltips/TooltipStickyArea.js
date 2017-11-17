import React from 'react';

import Tooltip from './Tooltip';
import FadeInAndOut from '../FadeInAndOut';

const propTypes = {
  anchor: React.PropTypes.string,
  onClose: React.PropTypes.func,
  tooltip: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
  ]).isRequired,
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
  ]).isRequired,
};

const defaultProps = {
  onClose: null,
};

/**
 * `TooltipStickyArea` allows you to define where a static tooltip should
 * be positioned.
 */

class TooltipStickyArea extends React.Component {

  constructor(props) {
    super(props);

    this.state = { open: false };

    this.onClose = this.onClose.bind(this);
  }

  componentDidMount() {
    this.setState({ open: true });
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
        target={ this.elem }
        anchor="bottom"
        onClose={ this.onClose }
      >
        { this.props.tooltip }
      </Tooltip>
    );
  }

  render() {
    const tooltip = this.renderTooltip();

    return (
      <div
        className="rc-tooltip-area rc-tooltip-area-sticky"
        ref={ (c) => { this.elem = c; } }
        { ...this.props }
      >
        <FadeInAndOut in={ this.state.open }>
          { tooltip }
        </FadeInAndOut>
        { this.props.children }
      </div>
    );
  }
}

TooltipStickyArea.propTypes = propTypes;
TooltipStickyArea.defaultProps = defaultProps;

export default TooltipStickyArea;
