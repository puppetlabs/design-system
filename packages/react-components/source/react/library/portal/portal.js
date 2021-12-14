import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const propTypes = {
  target: PropTypes.oneOf(['tooltip']),
};

const Portal = ({ children, target = 'tooltip' }) => {
  const root = document.getElementsByClassName('app')[0];
  const portalId = `portal-${target}`;
  let portal = document.getElementById(portalId);
  if (!portal) {
    portal = document.createElement('div');
    portal.id = portalId;
    root.appendChild(portal);
  }
  return createPortal(children, portal);
};
Portal.propTypes = propTypes;
export default Portal;
