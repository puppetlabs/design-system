import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  children: PropTypes.any,
};

const defaultProps = {
  children: null,
};

const MenuActionsButtons = props => (
  <div className="rc-menu-actions-buttons">
    { props.children }
  </div>
);

MenuActionsButtons.propTypes = propTypes;
MenuActionsButtons.defaultProps = defaultProps;

export default MenuActionsButtons;
