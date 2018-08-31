import PropTypes from 'prop-types';
import React from 'react';

import Tooltip from './Tooltip';
import FadeInAndOut from '../FadeInAndOut';

const propTypes = {
  anchor: PropTypes.string,
  onClick: PropTypes.func,
  tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
};

const defaultProps = {
  anchor: null,
  onClick: null,
};

/**
 * `TooltipHoverArea` allows you to define a zone that a tooltip will be rendered next to
 * when the zone has been hovered over.
 */
class TooltipHoverArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: false };

    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    const { onClick } = this.props;

    if (onClick) {
      // If something is going to happen on click, let's just close the tooltip.
      this.setState({ open: false });

      onClick(e);
    }
  }

  onMouseOver() {
    this.setState({ open: true });
  }

  onMouseOut() {
    this.setState({ open: false });
  }

  renderTooltip() {
    const { anchor, tooltip } = this.props;

    if (!this.elem) {
      return null;
    }

    return (
      <Tooltip target={this.elem} anchor={anchor}>
        {tooltip}
      </Tooltip>
    );
  }

  render() {
    const tooltip = this.renderTooltip();
    const { open } = this.state;
    const { children } = this.props;

    const props = {
      role: this.onClick ? 'button' : null,
      onClick: this.onClick,
    };

    return (
      <div
        {...props}
        className="rc-tooltip-area rc-tooltip-area-hover"
        onMouseEnter={this.onMouseOver}
        onMouseLeave={this.onMouseOut}
        ref={c => {
          this.elem = c;
        }}
      >
        <FadeInAndOut in={open}>{tooltip}</FadeInAndOut>
        {children}
      </div>
    );
  }
}

TooltipHoverArea.propTypes = propTypes;
TooltipHoverArea.defaultProps = defaultProps;

export default TooltipHoverArea;
