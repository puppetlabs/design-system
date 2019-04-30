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
      focussedIndex: null,
      tabProps: [],
    };

    this.activateTab = this.activateTab.bind(this);
    this.keyupEventListener = this.keyupEventListener.bind(this);
  }

  componentWillMount() {
    const { children } = this.props;

    const tabProps = children.map((child, index) => {
      const panelProps = {
        tabIndex: 0,
        role: 'tabPanel',
        id: `${child.props.title}-panel`,
        'aria-labelledby': child.props.title,
        hidden: !child.props.selected,
        className: classNames('rc-tabs-panel', child.props.className),
        content: child.props.content,
      };

      return {
        role: 'tab',
        'aria-selected': !!child.props.selected,
        'aria-controls': `${child.props.title}-panel`,
        id: child.props.title,
        tabindex: !child.props.selected ? -1 : 0,
        onClick: () => this.activateTab(index),
        onKeyUp: this.keyupEventListener,
        className: classNames('rc-tabs-tab', child.props.className),
        panel: panelProps,
      };
    });

    this.setState({ tabProps });
  }

  // Activates any given tab panel
  activateTab(index) {
    const { tabProps } = this.state;
    const tab = tabProps[index];
    const { panel } = tab;

    // Deactivate all other tabs
    this.deactivateTabs();

    // Remove tabindex attribute
    tab.tabindex = 0;

    // Set the tab as selected
    tab['aria-selected'] = true;

    // Remove hidden attribute from tab panel to make it visible
    panel.hidden = false;

    // Set focus when required
    this.setState({ focussedIndex: index });
  }

  // Deactivate all tabs and tab panels
  deactivateTabs() {
    const { tabProps } = this.state;

    for (let t = 0; t < tabProps.length; t += 1) {
      tabProps[t].tabindex = -1;
      tabProps[t]['aria-selected'] = false;
      tabProps[t].panel.hidden = true;
    }
  }

  // Handle keyup on tabs
  keyupEventListener(event) {
    const key = event.keyCode;

    if (direction[key]) {
      this.switchTabOnArrowPress(direction[key]);
    }
  }

  switchTabOnArrowPress(offset) {
    const { tabProps, focussedIndex } = this.state;
    const nextFocussedIndex = focussedIndex + offset;
    let adjustedNextFocussedIndex;

    if (tabProps.length > nextFocussedIndex && nextFocussedIndex >= 0) {
      adjustedNextFocussedIndex = nextFocussedIndex;
    } else if (offset < 0) {
      adjustedNextFocussedIndex = tabProps.length - 1;
    } else if (offset > 0) {
      adjustedNextFocussedIndex = 0;
    }

    this.setState({ focussedIndex: adjustedNextFocussedIndex });

    this.activateTab(adjustedNextFocussedIndex);
  }

  render() {
    const { tabProps, focussedIndex } = this.state;

    tabProps.forEach((tab, index) => {
      tab.focus = focussedIndex === index;
    });

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
