import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { LEFT_KEY_CODE, RIGHT_KEY_CODE, UP_KEY_CODE } from '../../constants';

import Tab from './Tab';
import Panel from './Panel';

const propTypes = {
  /** For accesibility, a unique ID is required */
  id: PropTypes.string.isRequired,
  /** Currently controls bg color of active tab & panel */
  type: PropTypes.oneOf(['primary', 'secondary']),
  /** Nested Tab.Tabs components */
  children: PropTypes.node,
  /** Optionally set active Tab with Tab ID */
  activeTab: PropTypes.string,
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
  activeTab: null,
  onChange: null,
  className: '',
  style: {},
};

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    // By default, the first tab is active
    const defaultActive = React.Children.toArray(props.children).filter(
      child => child && child.props,
    )[0].props.id;

    this.state = {
      activeTab: props.activeTab || defaultActive,
      dirty: false,
    };

    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onClick(activeTab) {
    const { onChange } = this.props;

    if (onChange) {
      onChange(activeTab);
    } else {
      this.setState({ activeTab, dirty: true });
    }
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

  switchTabOnArrowPress(offset) {
    const { children, onChange } = this.props;
    const { activeTab } = this.state;
    let activeIndex = 0;

    React.Children.toArray(children)
      .filter(child => child && child.props)
      .forEach((child, index) => {
        const { id } = child.props;

        if (activeTab === id) activeIndex = index;
      });

    const nextIndex = activeIndex + offset;
    let adjustedNextIndex;

    if (children.length > nextIndex && nextIndex >= 0) {
      adjustedNextIndex = nextIndex;
    } else if (offset < 0) {
      adjustedNextIndex = children.length - 1;
    } else if (offset > 0) {
      adjustedNextIndex = 0;
    }

    const newActiveTab = React.Children.toArray(children).filter(
      child => child && child.props,
    )[adjustedNextIndex].props.id;

    if (onChange) {
      onChange(newActiveTab);
    } else {
      this.setState({ activeTab: newActiveTab, dirty: true });
    }
  }

  render() {
    const { children, className, style, type, id: tabsId } = this.props;
    const { activeTab, dirty } = this.state;

    const tabs = [];
    const panels = [];

    React.Children.toArray(children)
      .filter(child => child && child.props)
      .forEach(child => {
        const { id } = child.props;
        const active = activeTab === id;

        const getKey = component => `${tabsId}-${component}-${id}`;

        const panelProps = {
          ...child.props,
          id,
          tabsId,
          active,
          key: getKey('panel'),
        };

        panels.push(<Panel {...panelProps} />);

        const tabProps = {
          ...panelProps,
          onClick: this.onClick,
          onKeyDown: this.onKeyDown,
          focussed: dirty && active,
          key: getKey('tab'),
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

export default Tabs;
