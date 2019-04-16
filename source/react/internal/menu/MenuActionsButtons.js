import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: null,
};

const MenuActionsButtons = ({ children }) => (
  <div className="rc-menu-actions-buttons">{children}</div>
);

MenuActionsButtons.propTypes = propTypes;
MenuActionsButtons.defaultProps = defaultProps;

export default MenuActionsButtons;
