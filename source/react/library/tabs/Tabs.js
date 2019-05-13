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

    this.state = {
      activeIndex: null,
      dirty: false,
    };

    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentWillMount() {
    const { activeTab } = this.props;
    const activeIndex = this.getActiveIndex(activeTab);

    this.setState({ activeIndex });
  }

  onClick(activeTab) {
    const { onChange } = this.props;

    if (!onChange) {
      const newActiveIndex = this.getActiveIndex(activeTab);

      this.setState({ activeIndex: newActiveIndex, dirty: true });
    }
  }

  onKeyDown(event) {
    const key = event.keyCode;
    const isSwitched = key === LEFT_KEY_CODE || key === RIGHT_KEY_CODE;
    const offset = -(UP_KEY_CODE - key);

    if (isSwitched) {
      const { onChange } = this.props;

      event.preventDefault();

      if (!onChange) this.switchTabOnArrowPress(offset);
    }
  }

  getActiveIndex(newActive) {
    const { children } = this.props;
    const { activeIndex } = this.state;
    let newActiveIndex = activeIndex || 0;

    React.Children.toArray(children)
      .filter(child => child && child.props)
      .forEach((child, index) => {
        const { id } = child.props;

        if (newActive === id) newActiveIndex = index;
      });

    return newActiveIndex;
  }

  switchTabOnArrowPress(offset) {
    const { children } = this.props;
    const { activeIndex } = this.state;
    const nextFocussedIndex = activeIndex + offset;
    let adjustedNextFocussedIndex;

    if (children.length > nextFocussedIndex && nextFocussedIndex >= 0) {
      adjustedNextFocussedIndex = nextFocussedIndex;
    } else if (offset < 0) {
      adjustedNextFocussedIndex = children.length - 1;
    } else if (offset > 0) {
      adjustedNextFocussedIndex = 0;
    }

    this.setState({ activeIndex: adjustedNextFocussedIndex, dirty: true });
  }

  render() {
    const { children, className, style, type, id: tabsId } = this.props;
    const { activeIndex, dirty } = this.state;

    const tabs = [];
    const panels = [];

    React.Children.toArray(children)
      .filter(child => child && child.props)
      .forEach((child, index) => {
        const { id } = child.props;
        const active = activeIndex === index;

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
