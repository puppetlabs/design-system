import React from 'react';
import classnames from 'classnames';
import TabPanel from './TabPanel';

const propTypes = {
  children: React.PropTypes.any,
  activeTab: React.PropTypes.number,
};

const defaultProps = {
  activeTab: 0,
};

class Tabs extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activeTab: props.activeTab,
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(tabIndex, e) {
    e.preventDefault();

    this.setState({ activeTab: tabIndex });
  }

  renderTabs() {
    const children = this.props.children;
    const tabPanels = !Array.isArray(children) ? [children] : children;
    const tabs = tabPanels.map((panel, i) => {
      const className = classnames('rc-tab', {
        'rc-tab-active': this.state.activeTab === i,
      });

      return (
        <li className={ className }>
          <a href="/#/tab" onClick={ this.onChange.bind(self, i) }>{ panel.props.title }</a>
        </li>
      );
    });

    return (
      <ul className="rc-tabs">
        {tabs}
      </ul>
    );
  }

  renderPanels() {
    return this.props.children.map((panel, i) => {
      const props = panel.props;
      const active = this.state.activeTab === i;

      return <TabPanel { ...props } active={ active } />;
    });
  }

  render() {
    const tabs = this.renderTabs();
    const panels = this.renderPanels();

    return (
      <div className="rc-tab-panels">
        {tabs}
        {panels}
      </div>
    );
  }
}

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;

module.exports = Tabs;
