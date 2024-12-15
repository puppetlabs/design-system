import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { usePopper } from 'react-popper';
import useMergeRef from '../../helpers/useMergeRef';
import { reactRef } from '../../helpers/customPropTypes';

const propTypes = {
  /** Optional (default outer). How to align the overlay in relation to the target element */
  align: PropTypes.oneOf(['inner', 'outer', 'center']),
  /** Content to be rendered inside the overlay */
  children: PropTypes.node.isRequired,
  /** Optional. React ref for the DOM element where the overlay should be mounted. If not defined the overlay is mounted in the same DOM element where it's declared. */
  container: reactRef,
  /** Optional. Override for the overlay offset (https://popper.js.org/docs/v2/modifiers/offset/). If declared, the align prop will be ignored. */
  offset: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  /** Optional (default bottom). Where to position the overlay in relation to the target element. */
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /** Optional (default false). Whether or not the overlay should be rendered. String value can be used instead of boolean to force the overlay to recalculate its position when the value changes. */
  show: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** React ref for the DOM element that should be used to position the overlay (if not provided the overlay will not be rendered). */
  target: reactRef,
};

const defaultProps = {
  align: 'outer',
  container: null,
  offset: null,
  position: 'bottom',
  show: false,
  target: null,
};

const innerAlignment = (position, { popper }) => {
  switch (position) {
    case 'top':
    case 'bottom':
      return [0, -popper.height];
    case 'right':
    case 'left':
      return [0, -popper.width];
    default:
      return [];
  }
};

const centerAlignment = (position, { popper }) => {
  switch (position) {
    case 'top':
    case 'bottom':
      return [0, -popper.height / 2];
    case 'right':
    case 'left':
      return [0, -popper.width / 2];
    default:
      return [];
  }
};

const overlayOffset = (align, position) => (popperValues) => {
  switch (align) {
    case 'inner':
      return innerAlignment(position, popperValues);
    case 'center':
      return centerAlignment(position, popperValues);
    default:
      return [];
  }
};

const resolveRef = (ref) => {
  if (!ref || !ref.current) {
    return null;
  }

  return ref.current.nodeType ? ref.current : null;
};

const withOffset = (offset) => ({
  name: 'offset',
  options: { offset },
});

const Overlay = forwardRef((props, fRef) => {
  const {
    align,
    children,
    container,
    offset,
    position,
    show,
    target,
    ...rest
  } = props;

  const targetNode = resolveRef(target);
  const [overlayNode, setOverlayNode] = useState(null);
  const mergedRef = useMergeRef(setOverlayNode, fRef);
  const offsetFn = useMemo(
    () => overlayOffset(align, position),
    [align, position],
  );
  const { styles, attributes, update } = usePopper(targetNode, overlayNode, {
    placement: position,
    modifiers: [withOffset(offset || offsetFn)],
  });

  const updateOverlay = () => {
    if (show && update) {
      update();
    }
  };
  useEffect(updateOverlay, [show]);

  if (!show) {
    return null;
  }

  const containerNode = resolveRef(container);

  if (container && containerNode === null) {
    return null;
  }

  if (targetNode === null) {
    return null;
  }

  const renderContent = (
    <div ref={mergedRef} style={styles.popper} {...rest} {...attributes.popper}>
      {children}
    </div>
  );

  return containerNode
    ? ReactDOM.createPortal(renderContent, containerNode)
    : renderContent;
});

Overlay.propTypes = propTypes;

Overlay.defaultProps = defaultProps;

export default Overlay;
