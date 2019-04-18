import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  UP_KEY_CODE,
  DOWN_KEY_CODE,
  HOME_KEY_CODE,
  END_KEY_CODE,
  ENTER_KEY_CODE,
  ESC_KEY_CODE,
  SPACE_KEY_CODE,
} from '../../constants';

import OptionMenuItem from './OptionMenuItem';
import Icon from '../../library/icon';

const isNil = val => val == null;

export const menuOption = PropTypes.shape({
  value: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  icon: PropTypes.oneOf(Icon.AVAILABLE_ICONS),
});

const propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['single', 'multiple']),
  options: PropTypes.arrayOf(menuOption),
  selected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  actionLabel: PropTypes.string,
  onChange: PropTypes.func,
  onActionClick: PropTypes.func,
  onEscape: PropTypes.func,
  className: PropTypes.string,
};

const defaultProps = {
  options: [],
  type: 'single',
  className: '',
  selected: null,
  onChange() {},
  actionLabel: 'Apply',
  onActionClick() {},
  onEscape() {},
};

const getOptionId = (id, value) => `${id}-${value}`;

const getFocusedId = (focusedIndex, id, options) =>
  isNil(focusedIndex)
    ? undefined
    : getOptionId(id, options[focusedIndex].value);

const getSelectionSet = selection =>
  new Set(Array.isArray(selection) ? selection : [selection]);

class OptionMenu extends Component {
  constructor(props) {
    super(props);

    const { options } = this.props;

    this.state = {
      focusedIndex: options.length ? 0 : null,
    };

    this.onClickItem = this.onClickItem.bind(this);
    this.onMouseEnterItem = this.onMouseEnterItem.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyDownInAction = this.onKeyDownInAction.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  onFocus() {
    const { focusedIndex } = this.state;

    if (isNil(focusedIndex)) {
      this.focusFirst();
    }
  }

  onClickItem(value) {
    this.select(value);
  }

  onMouseEnterItem(focusedIndex) {
    this.setState({
      focusedIndex,
    });
  }

  onMouseLeave() {
    this.setState({
      focusedIndex: null,
    });
  }

  onArrowUp() {
    const { focusedIndex } = this.state;

    if (isNil(focusedIndex)) {
      this.focusLast();
    } else {
      this.setState({ focusedIndex: Math.max(0, focusedIndex - 1) });
    }
  }

  onArrowDown() {
    const { focusedIndex } = this.state;
    const { options } = this.props;

    if (isNil(focusedIndex)) {
      this.focusFirst();
    } else {
      this.setState({
        focusedIndex: Math.min(options.length - 1, focusedIndex + 1),
      });
    }
  }

  onKeyDown(e) {
    const { onEscape } = this.props;

    switch (e.keyCode) {
      case UP_KEY_CODE: {
        this.onArrowUp();
        e.preventDefault();
        break;
      }
      case DOWN_KEY_CODE: {
        this.onArrowDown();
        e.preventDefault();
        break;
      }
      case HOME_KEY_CODE: {
        this.focusFirst();
        e.preventDefault();
        break;
      }
      case END_KEY_CODE: {
        this.focusLast();
        e.preventDefault();
        break;
      }
      case SPACE_KEY_CODE:
      case ENTER_KEY_CODE: {
        this.selectFocusedItem();
        e.preventDefault();
        break;
      }
      case ESC_KEY_CODE: {
        onEscape(e);
        e.preventDefault();
        break;
      }
      default:
        break;
    }
  }

  onKeyDownInAction(e) {
    const { onEscape } = this.props;

    switch (e.keyCode) {
      case ESC_KEY_CODE: {
        onEscape(e);
        e.preventDefault();
        break;
      }
      default:
        break;
    }
  }

  focusFirst() {
    this.setState({ focusedIndex: 0 });
  }

  focusLast() {
    const { options } = this.props;

    this.setState({ focusedIndex: options.length - 1 });
  }

  select(value) {
    const { type, selected, onChange } = this.props;

    if (type === 'multiple') {
      const selectionSet = getSelectionSet(selected);

      if (selectionSet.has(value)) {
        selectionSet.delete(value);
      } else {
        selectionSet.add(value);
      }
      onChange(Array.from(selectionSet));
    } else {
      onChange(value);
    }
  }

  selectFocusedItem() {
    const { focusedIndex } = this.state;
    const { options } = this.props;

    if (!isNil(focusedIndex)) {
      const { value } = options[focusedIndex];

      this.select(value);
    }
  }

  /* eslint-disable jsx-a11y/click-events-have-key-events */
  render() {
    const {
      onClickItem,
      onMouseEnterItem,
      onMouseLeave,
      onKeyDown,
      onKeyDownInAction,
      onFocus,
    } = this;
    const { focusedIndex } = this.state;
    const {
      id,
      options,
      selected,
      type,
      actionLabel,
      onActionClick,
      className,
      ...rest
    } = this.props;

    const selectionSet = getSelectionSet(selected);
    const focusedId = getFocusedId(focusedIndex, id, options);

    return (
      <div
        className={classNames('rc-menu', `rc-options-menu-${type}`, className)}
        {...rest}
      >
        <ul
          id={id}
          role="listbox"
          tabIndex="0"
          className="rc-menu-list"
          aria-activedescendant={focusedId}
          onMouseLeave={onMouseLeave}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          {...rest}
        >
          {options.map(({ value, label, icon }, index) => (
            <OptionMenuItem
              id={getOptionId(id, value)}
              key={value}
              focused={index === focusedIndex}
              selected={selectionSet.has(value)}
              icon={icon}
              onClick={e => onClickItem(value, index, e)}
              onMouseEnter={() => onMouseEnterItem(index)}
            >
              {label}
            </OptionMenuItem>
          ))}
        </ul>
        {type === 'multiple' && (
          <button
            type="button"
            className="rc-menu-action"
            onClick={onActionClick}
            onKeyDown={onKeyDownInAction}
          >
            {actionLabel}
          </button>
        )}
      </div>
    );
  }
}
/* eslint-enable */

OptionMenu.propTypes = propTypes;
OptionMenu.defaultProps = defaultProps;

export default OptionMenu;
