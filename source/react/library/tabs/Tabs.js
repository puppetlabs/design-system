import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { LEFT_KEY_CODE, RIGHT_KEY_CODE, UP_KEY_CODE } from '../../constants';

import Tab from './Tab';
import Panel from './Panel';

const propTypes = {
  /** Currently controls bg color of selected tab & panel */
  type: PropTypes.oneOf(['primary', 'secondary']),
  /** Nested Tab components */
  children: PropTypes.node,
  /** Optional additional className */
  className: PropTypes.string,
  /** Optional additional inline style */
  style: PropTypes.shape({}),
};

const defaultProps = {
  type: 'primary',
  children: null,
  className: '',
  style: {},
};

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: null,
      dirty: false,
    };

    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentWillMount() {
    const { children } = this.props;
    let defaultSelectedIndex = 0;

    React.Children.toArray(children)
      .filter(child => child && child.props)
      .forEach((child, index) => {
        const { selected } = child.props;

        if (selected) defaultSelectedIndex = index;
      });

    this.setState({ selectedIndex: defaultSelectedIndex });
  }

  onClick(index) {
    this.setState({ selectedIndex: index, dirty: true });
  }

  // Handle keyup on tabs
  onKeyDown(event) {
    const key = event.keyCode;
    const isValid = key === LEFT_KEY_CODE || RIGHT_KEY_CODE;
    const offset = -(UP_KEY_CODE - key);

    if (isValid) {
      this.switchTabOnArrowPress(offset);
    }
  }

  switchTabOnArrowPress(offset) {
    const { children } = this.props;
    const { selectedIndex } = this.state;
    const nextFocussedIndex = selectedIndex + offset;
    let adjustedNextFocussedIndex;

    if (children.length > nextFocussedIndex && nextFocussedIndex >= 0) {
      adjustedNextFocussedIndex = nextFocussedIndex;
    } else if (offset < 0) {
      adjustedNextFocussedIndex = children.length - 1;
    } else if (offset > 0) {
      adjustedNextFocussedIndex = 0;
    }

    this.setState({ selectedIndex: adjustedNextFocussedIndex, dirty: true });
  }

  render() {
    const { children, className, style, type } = this.props;
    const { selectedIndex, dirty } = this.state;

    const tabs = [];
    const panels = [];

    React.Children.toArray(children)
      .filter(child => child && child.props)
      .forEach((child, index) => {
        // Strip selected prop. Only used to set default state.
        const { selected: selectedProp, ...rest } = child.props;
        const selected = selectedIndex === index;

        const panelProps = {
          selected,
          id: index,
          key: index,
          ...rest,
        };

        panels.push(<Panel {...panelProps} />);

        const tabProps = {
          onClick: this.onClick,
          onKeyDown: this.onKeyDown,
          focussed: dirty && selected,
          ...panelProps,
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
