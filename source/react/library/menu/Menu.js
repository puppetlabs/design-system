import React from 'react';
import classnames from 'classnames';

const propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.any,
  size: React.PropTypes.oneOf(['small', 'tiny']),
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
    const { size, children, className: classProp } = this.props;
    const className = classnames('rc-menu', classProp, {
      [`rc-menu-${size}`]: size,
    });

    return <div className={ className }>{ children }</div>;
  }
}

Menu.propTypes = propTypes;

export default Menu;
