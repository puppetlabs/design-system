import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import scrollIntoView from 'scroll-into-view-if-needed';
import { renderableElement } from '../../helpers/customPropTypes';
import {
  UP_KEY_CODE,
  DOWN_KEY_CODE,
  HOME_KEY_CODE,
  END_KEY_CODE,
  ENTER_KEY_CODE,
  ESC_KEY_CODE,
  SPACE_KEY_CODE,
} from '../../constants';

import ActionMenuListItem from './ActionMenuListItem';
import Icon from '../../library/icon';
import { isNil, focus } from '../../helpers/statics';

const propTypes = {
  id: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.node.isRequired,
      icon: PropTypes.oneOf(Icon.AVAILABLE_ICONS),
      onClick: PropTypes.func,
      as: renderableElement,
    }),
  ),
  onActionClick: PropTypes.func,
  onEscape: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string,
};

const defaultProps = {
  actions: [],
  onActionClick() {},
  onEscape() {},
  onBlur() {},
  className: '',
};

const getActionId = (id, actionId) => `${id}-${actionId}`;

const getFocusedId = (focusedIndex, id, actions) =>
  isNil(focusedIndex) ? undefined : getActionId(id, actions[focusedIndex].id);

class ActionMenuList extends Component {
  constructor(props) {
    super(props);

    const { actions } = this.props;

    this.state = {
      focusedIndex: actions.length ? 0 : null,
    };

    /**
     * List of refs to action item elements
     */
    this.actionRefs = [];
    /**
     * List of refs to inner action item content, including rendered anchor
     * tags if used
     */
    this.actionInnerRefs = [];

    this.executeAction = this.executeAction.bind(this);
    this.onMouseEnterItem = this.onMouseEnterItem.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  onFocus() {
    const { focusedIndex } = this.state;

    if (isNil(focusedIndex)) {
      this.focusFirst();
    }
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
      this.focusItem(Math.max(0, focusedIndex - 1));
    }
  }

  onArrowDown() {
    const { focusedIndex } = this.state;
    const { actions } = this.props;

    if (isNil(focusedIndex)) {
      this.focusFirst();
    } else {
      this.focusItem(Math.min(actions.length - 1, focusedIndex + 1));
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
        this.executeFocusedItem();
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

  executeAction(onClick, id) {
    const { onActionClick } = this.props;

    onActionClick(id);

    if (onClick) {
      onClick();
    }
  }

  focus() {
    focus(this.listRef);
  }

  focusFirst() {
    this.focusItem(0);
  }

  focusLast() {
    const { actions } = this.props;

    this.focusItem(actions.length - 1);
  }

  focusItem(focusedIndex) {
    this.setState({ focusedIndex });

    /**
     * Scrolls newly focused item into view if it is not
     */
    scrollIntoView(this.actionRefs[focusedIndex], {
      block: 'end',
      scrollMode: 'if-needed',
    });
  }

  executeFocusedItem() {
    const { focusedIndex } = this.state;

    // triggering click event so that links work
    if (!isNil(focusedIndex) && this.actionRefs[focusedIndex]) {
      const focusedElement = this.actionInnerRefs[focusedIndex];

      focusedElement.click();
    }
  }

  /* eslint-disable jsx-a11y/click-events-have-key-events */
  render() {
    const {
      executeAction,
      onMouseEnterItem,
      onMouseLeave,
      onKeyDown,
      onFocus,
    } = this;
    const { focusedIndex } = this.state;
    const {
      id,
      actions,
      actionLabel,
      onActionClick,
      onEscape,
      className,
      style,
      onClickOutside,
      ...rest
    } = this.props;

    const focusedId = getFocusedId(focusedIndex, id, actions);

    return (
      <div
        className={classNames('rc-menu-list', 'rc-action-menu-list', className)}
        style={style}
      >
        <ul
          id={id}
          role="menu"
          tabIndex={0}
          className="rc-menu-list-inner"
          aria-activedescendant={focusedId}
          onMouseLeave={onMouseLeave}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          ref={el => {
            this.listRef = el;
          }}
          {...rest}
        >
          {actions.map(
            ({ id: actionId, label, icon, onClick, ...other }, index) => (
              <ActionMenuListItem
                id={getActionId(id, actionId)}
                key={actionId}
                focused={index === focusedIndex}
                icon={icon}
                onMouseEnter={() => onMouseEnterItem(index)}
                onClick={() => executeAction(onClick, actionId)}
                ref={el => {
                  this.actionRefs[index] = el;
                }}
                innerRef={el => {
                  this.actionInnerRefs[index] = el;
                }}
                {...other}
              >
                {label}
              </ActionMenuListItem>
            ),
          )}
        </ul>
      </div>
    );
  }
}
/* eslint-enable */

ActionMenuList.propTypes = propTypes;
ActionMenuList.defaultProps = defaultProps;

export default ActionMenuList;
