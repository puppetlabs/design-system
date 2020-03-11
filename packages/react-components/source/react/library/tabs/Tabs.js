import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { LEFT_KEY_CODE, RIGHT_KEY_CODE, UP_KEY_CODE } from '../../constants';
import withId from '../../helpers/withId';
import { componentHasType, focus, isKeyModified } from '../../helpers/statics';

import Actions from './Actions';
import Tab from './Tab';
import Panel from './Panel';

const propTypes = {
  /** An area for action buttons aligned right */
  actions: PropTypes.node,
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
  /** Optional additional inline style */
  style: PropTypes.shape({}),
  /** Style as a toolbar with adjacent tabs */
  toolbar: PropTypes.bool,
  /** Controls background color of active tab */
  type: PropTypes.oneOf(['primary', 'secondary']),
};

const defaultProps = {
  actions: null,
  children: null,
  className: '',
  initialTab: null,
  onChange() {},
  panePadding: true,
  style: {},
  toolbar: false,
  type: 'primary',
};

const collectTabsProps = children =>
  React.Children.toArray(children)
    .filter(child => child && child.props && componentHasType(child, Tab))
    .map((child, index) => ({
      ...child.props,
      id: child.props.id || index,
      index,
    }));

const getActiveTab = (props, state) => {
  const tabsProps = collectTabsProps(props.children);

  const activeChild = tabsProps.find(p => p.active);

  let activeTab;

  if (activeChild && activeChild.id) {
    activeTab = activeChild.id;
  } else if (state.activeTab != null) {
    // eslint-disable-next-line
    activeTab = state.activeTab;
  } else if (tabsProps.length) {
    activeTab = tabsProps[0].id;
  }

  const activeIndex = tabsProps.findIndex(p => p.id === activeTab);

  return {
    activeTab,
    activeIndex,
  };
};

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.tabButtonRefs = [];

    this.state = getActiveTab(props, {});

    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    return getActiveTab(props, state);
  }

  componentDidUpdate(prevProps, prevState) {
    const { activeTab: prevActiveTab } = getActiveTab(prevProps, prevState);
    const { activeTab } = this.state;

    if (activeTab !== prevActiveTab) {
      const { activeIndex } = this.state;

      focus(this.tabButtonRefs[activeIndex]);
    }
  }

  onClick(activeTab) {
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

  getActiveTab(tabsProps) {
    const { activeTab } = this.state;

    const activeChild = tabsProps.find(props => props.active);

    return (activeChild && activeChild.id) || activeTab;
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

  render() {
    const { activeTab } = this.state;
    const {
      children: userProvidedChildren,
      className,
      id: parentId,
      panePadding,
      style,
      tabs,
      toolbar,
      type,
    } = this.props;

    const tabsProps = collectTabsProps(userProvidedChildren);
    const otherChildren = React.Children.toArray(userProvidedChildren).filter(
      child => !componentHasType(child, Tab),
    );

    return (
      <div
        className={classNames('rc-tabs', `rc-tabs-${type}`, className, {
          'rc-tabs-pane-padding': panePadding,
          'rc-tabs-toolbar': toolbar,
        })}
        style={style}
      >
        <div className="rc-tabs-list" role="tablist">
          {tabsProps.map(({ id, children, ...rest }, index) => (
            <Tab
              {...rest}
              key={id}
              id={id}
              parentId={parentId}
              active={activeTab === id}
              onClick={this.onClick}
              onKeyDown={this.onKeyDown}
              ref={button => {
                this.tabButtonRefs[index] = button;
              }}
            />
          ))}
          {otherChildren}
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

Tabs.Actions = Actions;
Tabs.Tab = Tab;

export { Tabs as UnwrappedTabs };

export default withId(Tabs);
