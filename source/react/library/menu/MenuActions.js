import React from 'react';
import Message from './MenuActionsMessage';
import Buttons from './MenuActionsButtons';

const propTypes = {
  children: React.PropTypes.any,
  centered: React.PropTypes.bool,
};

const defaultProps = {
  children: null,
  centered: false,
};

const MenuActions = props => {
  let className = "rc-menu-actions";

  if (props.centered) {
    className += " rc-menu-actions-centered";
  }

  return (
    <div className={className}>
      { props.children }
    </div>
  );
};

MenuActions.propTypes = propTypes;
MenuActions.defaultProps = defaultProps;

MenuActions.Message = Message;
MenuActions.Buttons = Buttons;

export default MenuActions;
