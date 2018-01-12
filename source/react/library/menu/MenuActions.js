import React from 'react';
import Message from './MenuActionsMessage';
import Buttons from './MenuActionsButtons';

const propTypes = {
};

const defaultProps = {
};

class MenuActions extends React.Component {
  render() {
    return (
      <div className="rc-menu-actions">
        { this.props.children }
      </div>
    );
  }
}

MenuActions.propTypes = propTypes;
MenuActions.defaultProps = defaultProps;

MenuActions.Message = Message;
MenuActions.Buttons = Buttons;

export default MenuActions;
