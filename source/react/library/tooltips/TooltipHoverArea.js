import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Tooltip from './Tooltip';
import FadeInAndOut from '../FadeInAndOut';

const propTypes = {
  /** Position of tooltip relative to the activating element */
  anchor: PropTypes.oneOf(['bottom', 'right']),
  /** Optional onClick for the activating element */
  onClick: PropTypes.func,
  /** The content of the tooltip */
  tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  /** The activating element for the tooltip */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  /** Optional additional className */
  className: PropTypes.string,
  /** Optional additional inline style */
  style: PropTypes.shape({}),
};

const defaultProps = {
  anchor: null,
  onClick: null,
  className: '',
  style: {},
};

/**
 * When elements inside a `TooltipHoverArea` are hovered over or focussed on, a tooltip will render next to it.
 *
 * The tooltip prop passed to `TooltipHoverArea`--the tooltip content--can be a string or an element.
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
    const { children, className, style } = this.props;

    const props = {
      role: this.onClick ? 'button' : null,
      onClick: this.onClick,
      style,
    };

    return (
      <div
        {...props}
        className={classNames(
          'rc-tooltip-area rc-tooltip-area-hover',
          className,
        )}
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
