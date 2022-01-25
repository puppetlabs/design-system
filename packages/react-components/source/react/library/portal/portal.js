import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const propTypes = {
  /** Target id of div where portal wil be inserted. Creates the div at application root if id can't be found.  */
  target: PropTypes.string,
  /** Boolean value used to conditionally render the portal  */
  active: PropTypes.bool,
};
const defaultProps = {
  target: 'tooltip',
  active: true,
};
const Portal = ({ children, target, active }) => {
  // portal target with fallbacks
  const root =
    document.getElementsByClassName('app')[0] ||
    document.getElementById('root') ||
    document.body;

  const portalId = `portal-${target}`;
  let portal = document.getElementById(portalId);

  if (!portal && root && target) {
    portal = document.createElement('div');
    portal.id = portalId;
    root.appendChild(portal);
  }
  return active && target ? createPortal(children, portal) : children;
};
Portal.propTypes = propTypes;
PropTypes.defaultProps = defaultProps;
export default Portal;
