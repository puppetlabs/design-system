import React, { Suspense, lazy, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePopper } from 'react-popper';

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
  //Add popper flip option described in https://popper.js.org/popper-documentation.html#modifiers
  flip: PropTypes.bool,
  //Add popper arrow option described in https://popper.js.org/popper-documentation.html#modifiers
  arrow: PropTypes.bool,
};

export const defaultProps = {
  anchor: 'top',
  className: '',
  style: {},
  enabled: true,
  onClick: undefined,
  flip: true,
  arrow: true,
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
  ...popperOptions
}) => {
  const arrowRef = useRef(null);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);

  const popperModifiers = [
    {
      name: 'flip',
      enabled: popperOptions.flip,
    },
    {
      name: 'arrow',
      enabled: popperOptions.arrow,
      options: {
        element: arrowRef?.current,
        padding: 1,
        offset: [0, 6],
      },
    },
    {
      name: 'offset',
      options: {
        offset: [0, 6],
      },
    },
    {
      name: 'preventOverflow',
      options: {
        padding: 0,
      },
    },
    {
      name: 'hide',
      enabled: !enabled,
    },
  ];

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: anchor,
    modifiers: popperModifiers,
  });

  const handleMouseEvent = event => () => {
    if (event === 'mouseover') {
      popperElement?.setAttribute('data-show', '');
    } else {
      popperElement?.removeAttribute('data-show');
    }
  };

  const addListeners = () => {
    ['mouseover', 'mouseout'].forEach(event => {
      referenceElement?.addEventListener?.(
        event,
        handleMouseEvent(event),
        true,
      );
    });
  };
  const removeListeners = () => {
    ['mouseover', 'mouseout'].forEach((event, i) => {
      referenceElement?.removeEventListener?.(
        event,
        handleMouseEvent(event),
        true,
      );
    });
  };

  useEffect(() => {
    addListeners();
    return () => removeListeners();
  }, [referenceElement]);

  const root = document.getElementsByClassName('app')[0];

  return (
    <>
      {!!children &&
        !!tooltip &&
        createPortal(
          <div
            className={classNames('rc-tooltip', className)}
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            {popperOptions.arrow && (
              <span
                className="rc-tooltip-arrow"
                style={styles.arrow}
                {...attributes.arrow}
                ref={arrowRef}
              />
            )}
            {tooltip}
          </div>,
          root,
        )}
      {React.cloneElement(children, { ref: setReferenceElement })}
    </>
  );
};

TooltipHoverArea.propTypes = propTypes;
TooltipHoverArea.defaultProps = defaultProps;

export default TooltipHoverArea;
