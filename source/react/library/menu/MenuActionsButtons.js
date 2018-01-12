import React from 'react';

const propTypes = {
};

const defaultProps = {
};

class MenuActionsButtons extends React.Component {
  render() {
    return (
      <div className="rc-menu-actions-buttons">
        { this.props.children }
      </div>
    );
  }
}

MenuActionsButtons.propTypes = propTypes;
MenuActionsButtons.defaultProps = defaultProps;

export default MenuActionsButtons;
