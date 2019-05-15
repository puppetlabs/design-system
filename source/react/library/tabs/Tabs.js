import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { LEFT_KEY_CODE, RIGHT_KEY_CODE, UP_KEY_CODE } from '../../constants';
import withId from '../../helpers/withId';

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
      index,
    }));

const getTabId = ({ id, index }) => id || index;

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    const childProps = collectChildProps(props.children);

    this.state = {
      activeTab:
        props.initialTab || (childProps.length ? getTabId(childProps[0]) : 0),
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(activeTab) {
    const { onChange } = this.props;
    this.setState({ activeTab });
    onChange(activeTab);
  }

  onKeyDown(event, childProps) {
    const key = event.keyCode;
    const isSwitched = key === LEFT_KEY_CODE || key === RIGHT_KEY_CODE;
    const offset = -(UP_KEY_CODE - key);

    if (isSwitched) {
      event.preventDefault();

      this.switchTabOnArrowPress(offset, childProps);
    }
  }

  getActiveTab(childProps) {
    const { activeTab } = this.state;

    const activeChild = childProps.find(props => props.active);

    return (activeChild && getTabId(activeChild)) || activeTab;
  }

  switchTabOnArrowPress(offset, childProps) {
    const { children, onChange } = this.props;

    const activeTab = this.getActiveTab(childProps);

    const activeIndex = childProps.findIndex(
      child => getTabId(child) === activeTab,
    );

    const nextIndex = activeIndex + offset;
    let adjustedNextIndex;

    if (children.length > nextIndex && nextIndex >= 0) {
      adjustedNextIndex = nextIndex;
    } else if (offset < 0) {
      adjustedNextIndex = children.length - 1;
    } else if (offset > 0) {
      adjustedNextIndex = 0;
    }

    const newActiveTab = getTabId(childProps[adjustedNextIndex]);

    this.setState({ activeTab: newActiveTab });

    onChange(newActiveTab);
  }

  render() {
    const { children, className, style, type, id: tabsId } = this.props;

    const childProps = collectChildProps(children);

    const activeTab = this.getActiveTab(childProps);

    const tabs = [];
    const panels = [];

    childProps.forEach(props => {
      const id = getTabId(props);
      const active = activeTab === id;

      const panelProps = {
        ...props,
        id,
        tabsId,
        active,
        key: `${tabsId}-panel-${id}`,
      };

      panels.push(<Panel {...panelProps} />);

      const tabProps = {
        ...panelProps,
        onClick: this.onClick,
        onKeyDown: e => this.onKeyDown(e, childProps),
        focused: active,
        key: `${tabsId}-tab-${id}`,
      };

      tabs.push(<Tab {...tabProps} />);
    });

    return (
      <div
        className={classNames('rc-tabs', `rc-tabs-${type}`, className)}
        style={style}
      >
        <div className="rc-tabs-list" role="tablist">
          {tabs}
        </div>
        {panels}
      </div>
    );
  }
}

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;

Tabs.Tab = Tab;

export { Tabs as UnwrappedTabs };

export default withId(Tabs);
