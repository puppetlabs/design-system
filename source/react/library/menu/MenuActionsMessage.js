import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  children: PropTypes.any,
  message: PropTypes.string,
};

const defaultProps = {
  children: null,
  message: '',
};

const MenuActionsMessage = props => (
  <div className="rc-menu-actions-message">
    { props.message || props.children }
  </div>
);

MenuActionsMessage.propTypes = propTypes;
MenuActionsMessage.defaultProps = defaultProps;

export default MenuActionsMessage;
