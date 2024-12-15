import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  ENTER_KEY_CODE,
  LEFT_KEY_CODE,
  RIGHT_KEY_CODE,
  UP_KEY_CODE,
} from '../../constants';
import withId from '../../helpers/withId';
import { componentHasType, focus, isKeyModified } from '../../helpers/statics';

import Tab from './Tab';
import Panel from './Panel';
import Button from '../button';

const SCROLL_BUTTON_WIDTH = 32;

const propTypes = {
  /** Nested Tab.Tabs components */
  children: PropTypes.node,
  /** Optional additional className */
  className: PropTypes.string,
  /**
   * This prop is automatically passed from the withID HOC
   * @ignore
   */
  id: PropTypes.string.isRequired,
  /** Optionally set active Tab with Tab ID */
  initialTab: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Optional onChange event handler. If onChange exists, Tabs are in controlled mode */
  onChange: PropTypes.func,
  /** Add padding to tab pane */
  panePadding: PropTypes.bool,
  /** Whether to respond to a smaller container width by enabling horizontal scrolling and showing left/right buttons */
  scroll: PropTypes.bool,
  /** Optional additional inline style */
  style: PropTypes.shape({}),
  /** Whether to use the transparent tab design instead of the default outlined tabs */
  transparent: PropTypes.bool,
  /** Controls background color of active tab */
  type: PropTypes.oneOf(['primary', 'secondary']),
};

const defaultProps = {
  children: null,
  className: '',
  initialTab: null,
  onChange() {},
  panePadding: true,
  scroll: true,
  style: {},
  transparent: false,
  type: 'primary',
};

const collectTabsProps = (children) =>
  React.Children.toArray(children)
    .filter((child) => child && child.props && componentHasType(child, Tab))
    .map((child, index) => ({
      ...child.props,
      id: child.props.id || index,
      index,
    }));

const getActiveTab = (props, state) => {
  const tabsProps = collectTabsProps(props.children);

  const activeChild = tabsProps.find((p) => p.active);

  let activeTab;

  if (activeChild && activeChild.id) {
    activeTab = activeChild.id;
  } else if (state.activeTab != null) {
    // eslint-disable-next-line
    activeTab = state.activeTab;
  } else if (tabsProps.length) {
    activeTab = tabsProps[0].id;
  }

  const activeIndex = tabsProps.findIndex((p) => p.id === activeTab);

  return {
    ...state,
    activeTab,
    activeIndex,
  };
};

// Scrolls the `tabNode` into view within the `listNode`
const revealTab = (listNode, tabNode, marginOffset = 0) => {
  const visibleWidth = listNode.offsetWidth;
  const tabWidth = tabNode.offsetWidth;
  const tabLeft = tabNode.offsetLeft;
  const tabRight = tabLeft + tabWidth;
  const visibleAreaLeft = listNode.scrollLeft;
  const visibleAreaRight = visibleAreaLeft + visibleWidth;

  let scrollAmount = marginOffset;

  if (visibleAreaRight < tabRight) {
    scrollAmount += tabRight - visibleAreaRight;
    if (listNode.scrollLeft === 0) {
      scrollAmount += SCROLL_BUTTON_WIDTH;
    }
    // eslint-disable-next-line
    listNode.scrollLeft += scrollAmount;
  } else if (visibleAreaLeft > tabLeft) {
    scrollAmount += visibleAreaLeft - tabLeft;
    // eslint-disable-next-line
    listNode.scrollLeft -= scrollAmount;
  }
};

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.listRef = React.createRef();
    this.tabButtonRefs = [];

    this.state = getActiveTab(props, {
      scrollableLeft: false,
      scrollableRight: false,
    });

    this.onTabClick = this.onTabClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.updateScrollStatus = this.updateScrollStatus.bind(this);
    this.onScrollButtonClick = this.onScrollButtonClick.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    return getActiveTab(props, state);
  }

  componentDidMount() {
    this.updateScrollStatus();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.updateScrollStatus);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { activeTab: prevActiveTab } = getActiveTab(prevProps, prevState);
    const { activeTab } = this.state;

    if (activeTab !== prevActiveTab) {
      const { activeIndex, scrollableRight, scrollableLeft } = this.state;
      focus(this.tabButtonRefs[activeIndex]);

      if (!scrollableRight && !scrollableLeft) return;

      const { transparent } = this.props;
      revealTab(
        this.listRef.current,
        this.tabButtonRefs[activeIndex],
        // Tabs with borders should scroll a little further to avoid cutting off
        // their focus styles and allow for the margins they use at the extreme
        // left and right:
        transparent ? 0 : 4,
      );
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.updateScrollStatus);
    }
  }

  onTabClick(activeTab) {
    const { onChange } = this.props;
    this.setState({ activeTab });
    onChange(activeTab);
  }

  onKeyDown(event) {
    const key = event.keyCode;
    const isSwitched =
      (key === LEFT_KEY_CODE || key === RIGHT_KEY_CODE) &&
      !isKeyModified(event);
    const offset = -(UP_KEY_CODE - key);

    if (isSwitched) {
      event.preventDefault();

      this.switchTabOnArrowPress(offset);
    }
  }

  onScrollButtonClick(direction) {
    if (!this.listRef.current) return;

    const visibleWidth = this.listRef.current.offsetWidth;
    let scrollAmount = visibleWidth;
    const { scrollableRight } = this.state;

    if (direction === 'left' && !scrollableRight) {
      scrollAmount -= SCROLL_BUTTON_WIDTH;
    }

    this.listRef.current.scrollLeft +=
      direction === 'left' ? -scrollAmount : scrollAmount;
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  getActiveTab(tabsProps) {
    const { activeTab } = this.state;

    const activeChild = tabsProps.find((props) => props.active);

    return (activeChild && activeChild.id) || activeTab;
  }

  updateScrollStatus() {
    const { scroll } = this.props;
    if (!scroll) return;

    this.setState({
      scrollableLeft: this.listRef.current.scrollLeft > 0,
      scrollableRight:
        this.listRef.current.scrollLeft +
          this.listRef.current.offsetWidth +
          SCROLL_BUTTON_WIDTH <
        this.listRef.current.scrollWidth,
    });
  }

  switchTabOnArrowPress(offset) {
    const { children } = this.props;

    const { activeIndex } = this.state;

    const nextIndex = activeIndex + offset;
    let adjustedNextIndex;

    if (children.length > nextIndex && nextIndex >= 0) {
      adjustedNextIndex = nextIndex;
    } else if (offset < 0) {
      adjustedNextIndex = children.length - 1;
    } else if (offset > 0) {
      adjustedNextIndex = 0;
    }

    const buttonRef = this.tabButtonRefs[adjustedNextIndex];

    if (buttonRef) {
      buttonRef.click();
    }
  }

  renderScrollButton(direction) {
    const { scrollableLeft, scrollableRight } = this.state;
    if (
      (direction === 'left' && scrollableLeft) ||
      (direction === 'right' && scrollableRight)
    ) {
      return (
        <Button
          className="rc-tabs-button-scroll"
          type="transparent"
          icon={`chevron-${direction}`}
          onClick={() => this.onScrollButtonClick(direction)}
          onKeyUp={(e) => {
            if (e.keyCode === ENTER_KEY_CODE) {
              this.onScrollButtonClick(direction);
            }
          }}
        />
      );
    }

    return null;
  }

  render() {
    const { activeTab } = this.state;
    const {
      children: userProvidedChildren,
      className,
      id: parentId,
      panePadding,
      scroll,
      style,
      transparent,
      type,
    } = this.props;

    const tabsProps = collectTabsProps(userProvidedChildren);
    const otherChildren = React.Children.toArray(userProvidedChildren).filter(
      (child) => !componentHasType(child, Tab),
    );

    return (
      <div
        className={classNames('rc-tabs', `rc-tabs-${type}`, className, {
          'rc-tabs-pane-padding': panePadding,
          'rc-tabs-transparent': transparent,
          'rc-tabs-no-scroll': !scroll,
        })}
        style={style}
      >
        <div className="rc-tabs-list-container">
          {this.renderScrollButton('left')}
          <div
            className="rc-tabs-list"
            role="tablist"
            ref={this.listRef}
            onScroll={this.updateScrollStatus}
          >
            {tabsProps.map(
              ({ id, children, type: tabType, ...rest }, index) => (
                <Tab
                  {...rest}
                  key={id}
                  id={id}
                  parentId={parentId}
                  active={activeTab === id}
                  onClick={this.onTabClick}
                  onKeyDown={this.onKeyDown}
                  type={tabType || type}
                  ref={(button) => {
                    this.tabButtonRefs[index] = button;
                  }}
                />
              ),
            )}
            {otherChildren}
          </div>
          {this.renderScrollButton('right')}
        </div>
        {tabsProps.map(({ id, children, type: tabType }) => (
          <Panel
            key={id}
            id={id}
            parentId={parentId}
            active={activeTab === id}
            className={classNames({
              'rc-tabs-panel-type-secondary': tabType === 'secondary',
            })}
          >
            {children}
          </Panel>
        ))}
      </div>
    );
  }
}

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;

Tabs.Tab = Tab;

export { Tabs as UnwrappedTabs };

export default withId(Tabs);
