import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Tab from './Tab';
import Panel from './Panel';

const propTypes = {
  /** Nested Tab components */
  children: PropTypes.node,
  /** Optional additional className */
  className: PropTypes.string,
  /** Optional additional inline style */
  style: PropTypes.shape({}),
};

const defaultProps = {
  children: null,
  className: '',
  style: {},
};

// Add or substract depending on key pressed
const direction = {
  37: -1, // left arrow
  39: 1, // right arrow
};

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: null,
    };

    this.onClick = this.onClick.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  componentWillMount() {
    const { children } = this.props;
    let defaultActiveIndex = 0;

    React.Children.toArray(children)
      .filter(child => child && child.props)
      .forEach((child, index) => {
        const { active } = child.props;

        if (active) defaultActiveIndex = index;
      });

    this.setState({ activeIndex: defaultActiveIndex });
  }

  onClick(index) {
    this.setState({ activeIndex: index });
  }

  // Handle keyup on tabs
  onKeyUp(event) {
    const key = event.keyCode;

    if (direction[key]) {
      this.switchTabOnArrowPress(direction[key]);
    }
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

    this.setState({ activeIndex: adjustedNextFocussedIndex });
  }

  render() {
    const { children, className, style } = this.props;
    const { activeIndex } = this.state;

    const tabs = [];
    const panels = [];

    React.Children.toArray(children)
      .filter(child => child && child.props)
      .forEach((child, index) => {
        // Strip active prop. Only used to set default state.
        const { active, ...rest } = child.props;

        const panelProps = {
          active: activeIndex === index,
          id: index,
          key: index,
          ...rest,
        };

        panels.push(<Panel {...panelProps} />);

        const tabProps = {
          onClick: this.onClick,
          onKeyUp: this.onKeyUp,
          ...panelProps,
        };

        tabs.push(<Tab {...tabProps} />);
      });

    return (
      <div className={classNames('rc-form', className)} style={style}>
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
