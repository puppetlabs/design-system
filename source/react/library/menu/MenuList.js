import React from 'react';
import classnames from 'classnames';
import MenuItem from './MenuItem';

const propTypes = {
  size: React.PropTypes.oneOf(['tiny', 'small', 'medium']),
  selected: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array,
    React.PropTypes.number,
  ]),
  options: React.PropTypes.array,
  multiple: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  onFocus: React.PropTypes.func,
};

const defaultProps = {
  onFocus: () => {},
  multiple: false,
  onChange: null,
  options: [],
  selected: '',
  size: null,
};

class MenuList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedId: null,
    };

    this.onFocus = this.onFocus.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  componentDidUpdate() {
    const hasClass = (elem, className) => {
      if (!elem.className) {
        return false;
      }

      const classes = elem.className.split(' ');
      return classes.findIndex((c) => c === className) >= 0;
    };

    let menu = this.refs.menu,
        children = Array.from(menu.children);
        
    // TODO: We're tracking state of which element is selected using the DOM here. Maybe we can do this a little more simply by using the internal state?
    let selected = children.find((c) => hasClass(c, 'rc-menu-item-focused'));

    if (selected) {
      selected.scrollIntoView();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.focused !== this.state.focusedId) {
      this.setState({ focusedId: newProps.focused });
    }
  }

  onMouseOut() {
    if (this.state.focusedId) {
      this.setState({ focusedId: null }, () => {
        this.props.onFocus(null);
      });
    }
  }

  onFocus(focusedId) {
    return () => {
      this.setState({ focusedId }, () => {
        this.props.onFocus(focusedId);
      });
    };
  }

  onChange(selected) {
    if (this.props.onChange) {
      this.props.onChange(selected);
    }
  }

  render() {
    const {
      multiple,
      selected,
      options,
      size,
    } = this.props;
    const className = classnames('rc-menu-list', {
      [`rc-menu-list-${size}`]: size,
      'rc-menu-multiple': multiple,
    });

    const jsx = options.map((option) => {
      let isSelected = false;

      if (Array.isArray(selected)) {
        isSelected = selected.indexOf(option.id) >= 0;
      } else {
        isSelected = selected === option.id;
      }

      return (
        <MenuItem
          focused={ this.state.focusedId === option.id }
          onFocus={ this.onFocus(option.id) }
          key={ option.id }
          option={ option }
          className={ option.className }
          selected={ isSelected }
          onClick={ this.onChange }
          multiple={ multiple }
        />
      );
    });

    return (
      <ul
        ref="menu"
        onMouseLeave={ this.onMouseOut }
        className={ className }
      >
        { jsx }
      </ul>
    );
  }
}

MenuList.propTypes = propTypes;
MenuList.defaultProps = defaultProps;

export default MenuList;
