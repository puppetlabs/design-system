import React from 'react';
import classnames from 'classnames';
import TabPanel from './TabPanel';

const propTypes = {
  vertical: React.PropTypes.bool,
  activeTab: React.PropTypes.number,
  children: React.PropTypes.any,
};

const defaultProps = {
  vertical: false,
  activeTab: 0,
  children: null,
};

/**
 * Tabs conditionally render components together.
 *
 * @example ../../../../docs/Tabs.md
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
    return (e) => {
      e.preventDefault();

      this.setState({ activeTab: tabIndex });
    };
  }

  renderTabs() {
    const children = this.props.children;
    const tabPanels = !Array.isArray(children) ? [children] : children;
    const tabs = tabPanels.map((panel, i) => {
      const onClick = panel.props.onClick ? panel.props.onClick : this.onChange(i);
      const className = classnames('rc-tab', {
        'rc-tab-active': this.state.activeTab === i,
      });
      const tabKey = `tab-${i}`;

      return (
        <li key={ tabKey } className={ className }>
          <a href="/#/tab" onClick={ onClick }>{ panel.props.title }</a>
        </li>
      );
    });

    return (
      <ul>
        {tabs}
      </ul>
    );
  }

  renderPanels() {
    const panels = [];

    this.props.children.forEach((panel, i) => {
      const props = panel.props;
      const active = this.state.activeTab === i;
      const tabPanelKey = `tab-panel-${i}`;

      if (!panel.props.onClick) {
        panels.push(<TabPanel key={ tabPanelKey } { ...props } active={ active } />);
      }
    });

    return panels;
  }

  render() {
    const tabs = this.renderTabs();
    const panels = this.renderPanels();
    const className = classnames('rc-tabs', {
      'rc-tabs-vertical': this.props.vertical,
    });

    return (
      <div className={ className }>
        {tabs}
        {panels}
      </div>
    );
  }
}

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;

export default Tabs;
