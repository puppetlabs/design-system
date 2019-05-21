import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { LEFT_KEY_CODE, RIGHT_KEY_CODE, UP_KEY_CODE } from '../../constants';
import withId from '../../helpers/withId';
import { focus } from '../../helpers/statics';

import Tab from './Tab';
import Panel from './Panel';

const propTypes = {
  /**
   * This prop is automatically passed from the withID HOC
   * @ignore
   */
  id: PropTypes.string.isRequired,
  /** Currently controls bg color of active tab & panel */
  type: PropTypes.oneOf(['primary', 'secondary']),
  /** Nested Tab.Tabs components */
  children: PropTypes.node,
  /** Optionally set active Tab with Tab ID */
  initialTab: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Optional onChange event handler. If onChange exists, Tabs are in controlled mode */
  onChange: PropTypes.func,
  /** Optional additional className */
  className: PropTypes.string,
  /** Optional additional inline style */
  style: PropTypes.shape({}),
};

const defaultProps = {
  type: 'primary',
  children: null,
  initialTab: null,
  onChange() {},
  className: '',
  style: {},
};

const collectChildProps = children =>
  React.Children.toArray(children)
    .filter(child => child && child.props)
    .map((child, index) => ({
      ...child.props,
      id: child.props.id || index,
      index,
    }));

const getActiveTab = (props, state) => {
  const childProps = collectChildProps(props.children);

  const activeChild = childProps.find(p => p.active);

  let activeTab;

  if (activeChild && activeChild.id) {
    activeTab = activeChild.id;
  } else if (state.activeTab != null) {
    // eslint-disable-next-line
    activeTab = state.activeTab;
  } else if (childProps.length) {
    activeTab = childProps[0].id;
  }

  const activeIndex = childProps.findIndex(p => p.id === activeTab);

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
    const prevActiveTab = getActiveTab(prevProps, prevState);
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
    const isSwitched = key === LEFT_KEY_CODE || key === RIGHT_KEY_CODE;
    const offset = -(UP_KEY_CODE - key);

    if (isSwitched) {
      event.preventDefault();

      this.switchTabOnArrowPress(offset);
    }
  }

  getActiveTab(childProps) {
    const { activeTab } = this.state;

    const activeChild = childProps.find(props => props.active);

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
      style,
      type,
      id: parentId,
    } = this.props;

    const childProps = collectChildProps(userProvidedChildren);

    return (
      <div
        className={classNames('rc-tabs', `rc-tabs-${type}`, className)}
        style={style}
      >
        <div className="rc-tabs-list" role="tablist">
          {childProps.map(({ id, children, ...rest }, index) => (
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
        </div>
        {childProps.map(({ id, children }) => (
          <Panel key={id} id={id} parentId={parentId} active={activeTab === id}>
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
