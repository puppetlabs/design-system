import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import scrollIntoView from 'scroll-into-view-if-needed';
import { isNil, focus, cancelEvent } from '../../helpers/statics';

import {
  UP_KEY_CODE,
  DOWN_KEY_CODE,
  HOME_KEY_CODE,
  END_KEY_CODE,
  ENTER_KEY_CODE,
  ESC_KEY_CODE,
  SPACE_KEY_CODE,
} from '../../constants';

import OptionMenuListItem from './OptionMenuListItem';
import Icon from '../../library/icon';

const propTypes = {
  id: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.node.isRequired,
      icon: PropTypes.oneOf(Icon.AVAILABLE_ICONS),
    }),
  ),
  selected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  focusedIndex: PropTypes.number,
  actionLabel: PropTypes.string,
  onChange: PropTypes.func,
  onActionClick: PropTypes.func,
  onEscape: PropTypes.func,
  onFocusItem: PropTypes.func,
  onClickItem: PropTypes.func,
  onBlur: PropTypes.func,
  paginated: PropTypes.bool,
  paginationWarning: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.shape({}),
};

const defaultProps = {
  options: [],
  multiple: false,
  onBlur() {},
  className: '',
  selected: null,
  focusedIndex: 0,
  onChange() {},
  actionLabel: 'Apply',
  onActionClick() {},
  onEscape() {},
  onFocusItem() {},
  onClickItem() {},
  paginated: false,
  paginationWarning: '',
  style: {},
};

const getOptionId = (id, value) => `${id}-${value}`;

const getFocusedId = (focusedIndex, id, options) =>
  isNil(focusedIndex) || focusedIndex >= options.length
    ? undefined
    : getOptionId(id, options[focusedIndex].value);

const getSelectionSet = selection =>
  new Set(Array.isArray(selection) ? selection : [selection]);

class OptionMenuList extends Component {
  constructor(props) {
    super(props);

    const { options, focusedIndex } = this.props;

    this.state = {
      focusedIndex: options.length ? focusedIndex : null,
    };

    this.optionRefs = [];

    this.onClickItem = this.onClickItem.bind(this);
    this.onMouseEnterItem = this.onMouseEnterItem.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyDownInAction = this.onKeyDownInAction.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onMenuBlur = this.onMenuBlur.bind(this);
    this.onActionBlur = this.onActionBlur.bind(this);
  }

  componentWillReceiveProps(props) {
    const { options, focusedIndex } = props;
    const { focusedIndex: oldFocusedIndex } = this.props;

    if (options.length && focusedIndex !== oldFocusedIndex) {
      this.focusItem(focusedIndex);
    }
  }

  onFocus() {
    const { focusedIndex } = this.state;

    if (isNil(focusedIndex)) {
      this.focusFirst();
    }
  }

  onClickItem(value) {
    const { onClickItem } = this.props;

    this.select(value);

    onClickItem();
  }

  onMouseEnterItem(focusedIndex) {
    this.focusItem(focusedIndex);
  }

  onArrowUp() {
    const { focusedIndex } = this.state;

    if (isNil(focusedIndex)) {
      this.focusLast();
    } else {
      this.focusItem(Math.max(0, focusedIndex - 1));
    }
  }

  onArrowDown() {
    const { focusedIndex } = this.state;
    const { options } = this.props;

    if (isNil(focusedIndex)) {
      this.focusFirst();
    } else {
      this.focusItem(Math.min(options.length - 1, focusedIndex + 1));
    }
  }

  onKeyDown(e) {
    const { onEscape, onClickItem } = this.props;

    switch (e.keyCode) {
      case UP_KEY_CODE: {
        this.onArrowUp();
        cancelEvent(e);
        break;
      }
      case DOWN_KEY_CODE: {
        this.onArrowDown();
        cancelEvent(e);
        break;
      }
      case HOME_KEY_CODE: {
        this.focusFirst();
        cancelEvent(e);
        break;
      }
      case END_KEY_CODE: {
        this.focusLast();
        cancelEvent(e);
        break;
      }
      case SPACE_KEY_CODE:
      case ENTER_KEY_CODE: {
        this.selectFocusedItem();
        onClickItem();
        cancelEvent(e);
        break;
      }
      case ESC_KEY_CODE: {
        onEscape(e);
        cancelEvent(e);
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
        cancelEvent(e);
        break;
      }
      default:
        break;
    }
  }

  onMenuBlur(e) {
    const { onBlur } = this.props;

    if (e.relatedTarget !== this.button) {
      onBlur(e);
    }
  }

  onActionBlur(e) {
    const { onBlur } = this.props;

    if (e.relatedTarget !== this.menu) {
      onBlur(e);
    }
  }

  focusMenu() {
    focus(this.menu);
  }

  focusFirst() {
    this.focusItem(0);
  }

  focusLast() {
    const { options } = this.props;

    this.focusItem(options.length - 1);
  }

  focusItem(focusedIndex) {
    const { onFocusItem } = this.props;

    this.setState({ focusedIndex }, onFocusItem(focusedIndex));

    /**
     * Scrolls newly focused item into view if it is not
     */
    scrollIntoView(this.optionRefs[focusedIndex], {
      block: 'end',
      scrollMode: 'if-needed',
    });
  }

  select(value) {
    const { multiple, selected, onChange } = this.props;

    if (multiple) {
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
      onKeyDown,
      onKeyDownInAction,
      onFocus,
      onMenuBlur,
      onActionBlur,
    } = this;
    const { focusedIndex } = this.state;
    const {
      id,
      options,
      selected,
      multiple,
      actionLabel,
      onActionClick,
      onEscape,
      className,
      style,
      onBlur,
      focusedIndex: focussed,
      onFocusItem,
      paginated,
      paginationWarning,
      onClickItem: onClick,
      ...rest
    } = this.props;

    if (!options.length) {
      return null;
    }

    const selectionSet = getSelectionSet(selected);
    const focusedId = getFocusedId(focusedIndex, id, options);

    const list = (
      <ul
        id={id}
        role="listbox"
        tabIndex={0}
        className="rc-menu-list-inner"
        aria-activedescendant={focusedId}
        aria-multiselectable={multiple}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onMenuBlur}
        ref={menu => {
          this.menu = menu;
        }}
        {...rest}
      >
        {options.map(({ value, label, icon }, index) => (
          <OptionMenuListItem
            id={getOptionId(id, value)}
            key={value}
            focused={index === focusedIndex}
            selected={selectionSet.has(value)}
            icon={icon}
            onClick={() => onClickItem(value)}
            onMouseEnter={() => onMouseEnterItem(index)}
            ref={option => {
              this.optionRefs[index] = option;
            }}
          >
            {label}
          </OptionMenuListItem>
        ))}
      </ul>
    );

    let pagination;

    if (paginated && paginationWarning) {
      // TODO: Get sign off on this prompt and upgrade to pagination controls if appropriate
      pagination = (
        <span className="rc-menu-pagination">{paginationWarning}</span>
      );
    }

    return (
      <div
        className={classNames(
          'rc-menu-list',
          {
            'rc-option-menu-list-multiple': multiple,
            'rc-option-menu-list-single': !multiple,
          },
          className,
        )}
        style={style}
      >
        {list}
        {pagination}
        {multiple && (
          <button
            type="button"
            className="rc-menu-action"
            onClick={onActionClick}
            onKeyDown={onKeyDownInAction}
            onBlur={onActionBlur}
            ref={button => {
              this.button = button;
            }}
          >
            {actionLabel}
          </button>
        )}
      </div>
    );
  }
}
/* eslint-enable */

OptionMenuList.propTypes = propTypes;
OptionMenuList.defaultProps = defaultProps;

export default OptionMenuList;
