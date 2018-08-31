import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  children: PropTypes.node,
  message: PropTypes.string,
};

const defaultProps = {
  children: null,
  message: '',
};

const MenuActionsMessage = ({ message, children }) => (
  <div className="rc-menu-actions-message">{message || children}</div>
);

MenuActionsMessage.propTypes = propTypes;
MenuActionsMessage.defaultProps = defaultProps;

export default MenuActionsMessage;
