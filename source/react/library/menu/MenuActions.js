import React from 'react';
import Message from './MenuActionsMessage';
import Buttons from './MenuActionsButtons';

const propTypes = {
  children: React.PropTypes.any,
};

const defaultProps = {
  children: null,
};

const MenuActions = props => (
  <div className="rc-menu-actions">
    { props.children }
  </div>
);

MenuActions.propTypes = propTypes;
MenuActions.defaultProps = defaultProps;

MenuActions.Message = Message;
MenuActions.Buttons = Buttons;

export default MenuActions;
