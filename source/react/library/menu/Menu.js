import React from 'react';
import classnames from 'classnames';

const propTypes = {
  children: React.PropTypes.any,
  size: React.PropTypes.string,
};

/**
 * Menu can be used to present a list of options, form items, and various
 * buttons to the user. It can contain `MenuHeader`, `MenuList`, and
 * `MenuSection` components.
 *
 * @example ../../../../docs/Menu.md
 */

class Menu extends React.Component {
  render() {
    const { size, children } = this.props;
    const className = classnames('rc-menu', {
      [`rc-menu-${size}`]: size,
    });

    return <div className={ className }>{ children }</div>;
  }
}

Menu.propTypes = propTypes;

export default Menu;
