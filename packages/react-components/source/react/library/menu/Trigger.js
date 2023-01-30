import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { has } from 'lodash';
import Button from '../button';
import MenuContext from './context';

const TriggerPropTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  onClick: PropTypes.func,
};
const TriggerDefaultProps = {
  as: Button,
  onClick: undefined,
};

const Trigger = ({ as: Element, onClick: onClickProp, ...props }) => {
  const { triggerRef, openMenu } = useContext(MenuContext);
  const onClick = (...args) => {
    openMenu();
    if (onClickProp) {
      onClickProp(...args);
    }
  };
  const ref = has(Element.propTypes, 'inputRef')
    ? { inputRef: triggerRef }
    : { ref: triggerRef };
  return <Element {...props} {...ref} onClick={onClick} />;
};
Trigger.propTypes = TriggerPropTypes;
Trigger.defaultProps = TriggerDefaultProps;

export default Trigger;
