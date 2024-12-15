import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import MenuContext from '../../internal/popup-menus/menu-context';

const TriggerPropTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  onClick: PropTypes.func,
  forwardRefAs: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};
const TriggerDefaultProps = {
  as: Button,
  onClick: undefined,
  forwardRefAs: 'ref',
};

const Trigger = ({
  as: Element,
  onClick: onClickProp,
  forwardRefAs,
  ...props
}) => {
  const { triggerRef, openMenu, menuTriggerId } = useContext(MenuContext);

  const onClick = (...args) => {
    openMenu();
    if (onClickProp) {
      onClickProp(...args);
    }
  };

  const ref = { [forwardRefAs]: triggerRef };

  return <Element id={menuTriggerId} {...props} {...ref} onClick={onClick} />;
};
Trigger.propTypes = TriggerPropTypes;
Trigger.defaultProps = TriggerDefaultProps;

export default Trigger;
