import React from 'react';

import Tooltip from './Tooltip';

const propTypes = {
  onClick: React.PropTypes.func,
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

class TooltipHoverArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: false };

    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (this.props.onClick) {
      // If something is going to happen on click, let's just close the tooltip.
      this.setState({ open: false });

      this.props.onClick(e);
    }
  }

  onMouseOver() {
    this.setState({ open: true });
  }

  onMouseOut() {
    this.setState({ open: false });
  }

  renderTooltip() {
    return (
      <Tooltip target={ this.elem } anchor={ this.props.anchor }>
        { this.props.tooltip }
      </Tooltip>
    );
  }

  render() {
    let tooltip = null;

    if (this.state.open) {
      tooltip = this.renderTooltip();
    }

    return (
      <div onClick={ this.onClick }>
        { tooltip }
        <div
          className="rc-tooltip-hover-area"
          onMouseOver={ this.onMouseOver }
          onMouseOut={ this.onMouseOut }
          ref={ (c) => { this.elem = c; } }
        >
          { this.props.children }
        </div>
      </div>
    );
  }
}

TooltipHoverArea.propTypes = propTypes;

export default TooltipHoverArea;
