import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import TabPanel from './TabPanel';

const propTypes = {
  vertical: PropTypes.bool,
  activeTab: PropTypes.number,
  children: PropTypes.node,
};

const defaultProps = {
  vertical: false,
  activeTab: 0,
  children: null,
};

/**
 * Tabs conditionally render components together.
 */
class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: props.activeTab,
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(tabIndex) {
    return e => {
      e.preventDefault();

      this.setState({ activeTab: tabIndex });
    };
  }

  renderTabs() {
    const { children } = this.props;
    const { activeTab } = this.state;
    const tabPanels = !Array.isArray(children) ? [children] : children;
    const tabs = tabPanels.map((panel, i) => {
      const onClick = panel.props.onClick
        ? panel.props.onClick
        : this.onChange(i);
      const className = classnames('rc-tab', {
        'rc-tab-active': activeTab === i,
      });
      const tabKey = `tab-${i}`;

      return (
        <li key={tabKey} className={className}>
          <a href="/#/tab" onClick={onClick}>
            {panel.props.title}
          </a>
        </li>
      );
    });

    return <ul>{tabs}</ul>;
  }

  renderPanels() {
    const panels = [];
    const { children } = this.props;
    const { activeTab } = this.state;

    children.forEach((panel, i) => {
      const { props } = panel;
      const active = activeTab === i;
      const tabPanelKey = `tab-panel-${i}`;

      if (!panel.props.onClick) {
        panels.push(<TabPanel key={tabPanelKey} {...props} active={active} />);
      }
    });

    return panels;
  }

  render() {
    const { vertical } = this.props;
    const tabs = this.renderTabs();
    const panels = this.renderPanels();
    const className = classnames('rc-tabs', {
      'rc-tabs-vertical': vertical,
    });

    return (
      <div className={className}>
        {tabs}
        {panels}
      </div>
    );
  }
}

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;

export default Tabs;
