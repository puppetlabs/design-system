import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import Tab from './Tab';
import Panel from './Panel';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: null,
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
      activeIndex: 0,
    };

    this.keyupEventListener = this.keyupEventListener.bind(this);
  }

  getTabProps() {
    const { activeIndex } = this.state;
    const { children } = this.props;

    const tabProps = children.map((child, index) => {
      const isActive = activeIndex === index;

      const panelProps = {
        role: 'tabPanel',
        id: `${child.props.title}-panel`,
        'aria-labelledby': child.props.title,
        hidden: !isActive,
        className: classNames('rc-tabs-panel', child.props.className),
        content: child.props.content,
      };

      return {
        role: 'tab',
        'aria-selected': !!isActive,
        'aria-controls': `${child.props.title}-panel`,
        id: child.props.title,
        tabindex: !isActive ? -1 : 0,
        onClick: () => this.setState({ activeIndex: index }),
        onKeyUp: this.keyupEventListener,
        focus: activeIndex === index,
        className: classNames('rc-tabs-tab', child.props.className),
        panel: panelProps,
      };
    });

    return tabProps;
  }

  // Handle keyup on tabs
  keyupEventListener(event) {
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
    const tabProps = this.getTabProps();

    const tabs = tabProps.map(props => <Tab {...props} />);
    const panels = tabProps.map(tab => {
      const props = tab.panel;

      return <Panel {...props} />;
    });

    return (
      <div className="rc-tabs">
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

export default Tabs;
