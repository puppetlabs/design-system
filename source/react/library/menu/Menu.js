import React from 'react';
import classnames from 'classnames';

const propTypes = {
  children: React.PropTypes.any,
  size: React.PropTypes.string,
};

class Menu extends React.Component {
  render() {
    const { size, children } = this.props;
    const className = classnames('rc-menu', `rc-menu-${size}`);

    return <div className={ className }>{ children }</div>;
  }
}

Menu.propTypes = propTypes;

export default Menu;
