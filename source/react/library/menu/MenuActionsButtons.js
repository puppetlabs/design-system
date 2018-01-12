import React from 'react';

const propTypes = {
  children: React.PropTypes.any,
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
