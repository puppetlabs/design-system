import React from 'react';
import classnames from 'classnames';

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

const MenuActions = (props) => {
  const className = classnames('rc-menu-actions', {
    'rc-menu-actions-centered': props.centered,
  });

  return (
    <div className={ className }>
      { props.children }
    </div>
  );
};

MenuActions.propTypes = propTypes;
MenuActions.defaultProps = defaultProps;

MenuActions.Message = Message;
MenuActions.Buttons = Buttons;

export default MenuActions;
