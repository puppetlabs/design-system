import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import scrollIntoView from 'scroll-into-view-if-needed';
import Text from '../../library/text';
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
  showCancel: PropTypes.bool,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        /** Select option value */
        value: PropTypes.string.isRequired,
        /** Select option label */
        label: PropTypes.string.isRequired,
        /** Optional icon associated with this option */
        icon: PropTypes.oneOf(Icon.AVAILABLE_ICONS),
        /** Optional custom icon associated with this option */
        svg: PropTypes.element,
      }),
    ),
    PropTypes.object,
  ]),
  selected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  focusedIndex: PropTypes.number,
  actionLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  onChange: PropTypes.func,
  onActionClick: PropTypes.func,
  onEscape: PropTypes.func,
  onFocusItem: PropTypes.func,
  onClickItem: PropTypes.func,
  onBlur: PropTypes.func,
  footer: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.shape({}),
  /** Boolean that when true will render a navigation button in the dropdown */
  navigationButton: PropTypes.bool,
  /** Function called when navigation button is pressed */
  onNavigate: PropTypes.func,
  /** Text displayed on the navigation button */
  navigationLabel: PropTypes.string,
};

const defaultProps = {
  options: [],
  multiple: false,
  showCancel: false,
  onBlur() {},
  className: '',
  selected: null,
  focusedIndex: 0,
  onChange() {},
  actionLabel: 'Apply',
  cancelLabel: 'Cancel',
  onActionClick() {},
  onEscape() {},
  onFocusItem() {},
  onClickItem() {},
  footer: null,
  style: {},
  navigationButton: false,
  onNavigate: () => {},
  navigationLabel: 'Navigate',
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
    this.onCancel = this.onCancel.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyDownInAction = this.onKeyDownInAction.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onMenuBlur = this.onMenuBlur.bind(this);
    this.onActionBlur = this.onActionBlur.bind(this);
  }

  // Update focused item for autocomplete
  componentDidUpdate(prevProps, prevState) {
    const { options, focusedIndex } = this.props;

    if (
      options.length &&
      focusedIndex !== prevProps.focusedIndex &&
      focusedIndex !== prevState.focusedIndex
    ) {
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

  onCancel(e) {
    const { onEscape } = this.props;

    onEscape(e);
    cancelEvent(e);
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
    const item = this.optionRefs[focusedIndex];
    if (item) {
      scrollIntoView(item, {
        block: 'end',
        scrollMode: 'if-needed',
      });
    }
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
      onCancel,
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
      showCancel,
      actionLabel,
      cancelLabel,
      onActionClick,
      onEscape,
      className,
      style,
      onBlur,
      focusedIndex: focussed,
      onFocusItem,
      footer,
      onClickItem: onClick,
      navigationButton,
      onNavigate,
      navigationLabel,
      ...rest
    } = this.props;

    const selectionSet = getSelectionSet(selected);
    const focusedId = getFocusedId(null, id, options);
    let isDescriptionMenu = false;
    let optionsIsObject = false;
    const groupMenu = [];

    if (typeof options === 'object' && !Array.isArray(options)) {
      optionsIsObject = true;

      let listIndex = 0;
      const optionTitles = Object.keys(options);

      optionTitles.forEach(title => {
        options[title].forEach(element => {
          if (Object.prototype.hasOwnProperty.call(element, 'description')) {
            isDescriptionMenu = true;
          }
        });

        groupMenu.push(
          <Text
            className="rc-option-menu-list-title-item"
            size="small"
            color="medium"
          >
            {title}
          </Text>,
        );
        groupMenu.push(
          options[title].map(
            ({ value, label, icon, svg, description }, index) => {
              const groupedIndex = index + listIndex;
              return (
                <OptionMenuListItem
                  id={getOptionId(id, value)}
                  key={value}
                  focused={groupedIndex === focusedIndex}
                  selected={selectionSet.has(value)}
                  icon={icon}
                  svg={svg}
                  isDescriptionMenu={isDescriptionMenu}
                  description={description}
                  isGroupedMenu
                  onClick={() => onClickItem(value)}
                  onMouseEnter={() => onMouseEnterItem(groupedIndex)}
                  ref={option => {
                    this.optionRefs[groupedIndex] = option;
                  }}
                >
                  {label}
                </OptionMenuListItem>
              );
            },
          ),
        );
        listIndex += options[title].length;
      });
    } else {
      options.forEach(element => {
        if (Object.prototype.hasOwnProperty.call(element, 'description')) {
          isDescriptionMenu = true;
        }
      });
    }

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
        {' '}
        {optionsIsObject
          ? groupMenu
          : options.map(
              ({ value, label, icon, svg, description, title }, index) => (
                <OptionMenuListItem
                  id={getOptionId(id, value)}
                  key={value}
                  focused={index === focusedIndex}
                  selected={selectionSet.has(value)}
                  icon={icon}
                  svg={svg}
                  isDescriptionMenu={isDescriptionMenu}
                  description={description}
                  title={title}
                  onClick={() => onClickItem(value)}
                  onMouseEnter={() => onMouseEnterItem(index)}
                  ref={option => {
                    this.optionRefs[index] = option;
                  }}
                >
                  {label}
                </OptionMenuListItem>
              ),
            )}
      </ul>
    );

    let listFooter;

    if (footer) {
      listFooter = <span className="rc-menu-footer">{footer}</span>;
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
        {listFooter}
        {multiple && (
          <div className="rc-menu-action-container">
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
            {showCancel && (
              <button
                type="button"
                className="rc-menu-action"
                onClick={onCancel}
                onKeyDown={onKeyDownInAction}
                onBlur={onActionBlur}
                ref={button => {
                  this.button = button;
                }}
              >
                {cancelLabel}
              </button>
            )}
          </div>
        )}
        {navigationButton && (
          <div className="rc-menu-action-container">
            <button
              type="button"
              className="rc-menu-action"
              onClick={() => onNavigate()}
              onKeyDown={onKeyDownInAction}
              onBlur={onActionBlur}
              ref={button => {
                this.button = button;
              }}
            >
              {navigationLabel}
            </button>
          </div>
        )}
      </div>
    );
  }
}
/* eslint-enable */

OptionMenuList.propTypes = propTypes;
OptionMenuList.defaultProps = defaultProps;

export default OptionMenuList;
