import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const propTypes = {
  /** Position of tooltip relative to the activating element */
  anchor: PropTypes.oneOf(['bottom', 'right', 'left', 'top']),
  /** Optional onClick for the activating element */
  onClick: PropTypes.func,
  /** The content of the tooltip */
  tooltip: PropTypes.node.isRequired,
  /** The activating element for the tooltip */
  children: PropTypes.node.isRequired,
  /** Optional additional className */
  className: PropTypes.string,
  /** Optional additional inline style */
  style: PropTypes.shape({}),
  /** Optional, prevents tooltip from displaying when false */
  enabled: PropTypes.bool,
};

export const defaultProps = {
  anchor: 'top',
  className: '',
  style: {},
  enabled: true,
  onClick: undefined,
};

/**
 *
 * When elements inside a `Tooltip` are hovered over or focussed on, a tooltip will render next to it.
 *
 * @prop {string | Element } tooltip element or string to be rendered in the tooltip.
 *
 */

const TooltipHoverArea = ({
  anchor,
  children,
  className,
  tooltip,
  onClick,
  style,
  enabled,
}) => {
  return (
    <span
      aria-hidden="true"
      className={classNames(`rc-tooltip-container`, className)}
      onClick={onClick}
      onKeyPress={onClick}
      style={{ ...style }}
    >
      {enabled && !!children && !!tooltip && (
        <div className={classNames('rc-tooltip', `rc-tooltip-${anchor}`)}>
          {tooltip}
        </div>
      )}
      {children}
    </span>
  );
};

TooltipHoverArea.propTypes = propTypes;
TooltipHoverArea.defaultProps = defaultProps;

export default TooltipHoverArea;
