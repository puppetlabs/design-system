import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const propTypes = {
  /** Target id of div where portal will append content. Creates the div at application root if id can't be found in the DOM. All target div Ids must have the  prefix: `rc-portal-` */
  target: PropTypes.string,
  /** Boolean value used to conditionally render content in target div. If false, it will render the content at its current location in the dom */
  active: PropTypes.bool,
  /** Optional additional className to apply to portal div */
  className: PropTypes.string,
  /** Optional inline styles to apply to portal div */
  style: PropTypes.shape({}),
  /** Content  to render in portal */
  children: PropTypes.node,
};
const defaultProps = {
  target: 'default',
  active: true,
  className: '',
  style: {},
  children: null,
};

const Portal = ({ children, target, active, style, className }) => {
  // portal target with fallbacks
  const root =
    document.getElementsByClassName('app')[0] ||
    document.getElementById('root') ||
    document.body;

  const portalId = `rc-portal-${target}`;
  let portal = document.getElementById(portalId);

  if (!portal && root && target) {
    portal = document.createElement('div');
    portal.id = portalId;

    // TODO: add option to prepend
    root.appendChild(portal);
  }

  // Apply classes and styles to portal div
  if (className) portal.className = className;
  if (style) Object.assign(portal.style, style);

  // Remove portal on unmount
  useEffect(
    () => () => {
      const p = document.getElementById(portalId);
      if (p) p.remove();
    },
    [],
  );

  // Remove portal if not active
  if (!active && portal) portal.remove();

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{active && target ? createPortal(children, portal) : children}</>;
};
Portal.propTypes = propTypes;
Portal.defaultProps = defaultProps;
export default Portal;
