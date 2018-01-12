import React from 'react';

const propTypes = {
  children: React.PropTypes.any,
  message: React.PropTypes.string,
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
