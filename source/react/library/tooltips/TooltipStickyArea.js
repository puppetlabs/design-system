import React from 'react';

import Tooltip from './Tooltip';

const propTypes = {
  anchor: React.PropTypes.string,
  tooltip: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
  ]).isRequired,
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
  ]).isRequired,
};

/**
 * `TooltipStickyArea` allows you to define where a static tooltip should
 * be positioned.
 */
class TooltipStickyArea extends React.Component {
  componentDidMount() {
    // Force update so we can access this.child;
    this.forceUpdate();
  }

  renderTooltip() {
    let tooltip;

    if (this.child) {
      tooltip = <Tooltip target={ this.child } anchor="bottom" >{ this.props.tooltip }</Tooltip>;
    }

    return tooltip;
  }

  render() {
    const tooltip = this.renderTooltip();
    const children = React.cloneElement(this.props.children, { ref: (c) => { this.child = c; } });

    return (
      <div>
        { tooltip }
        { children }
      </div>
    );
  }
}

TooltipStickyArea.propTypes = propTypes;

export default TooltipStickyArea;
