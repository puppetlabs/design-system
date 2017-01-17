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

class TooltipHoverArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: false };

    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
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
      <div>
        { tooltip }
        <div
          style={ { display: 'inline-block' } }
          onMouseOver={ this.onMouseOver }
          onMouseOut={ this.onMouseOut }
          ref={ c => { this.elem = c; } }
        >
          { this.props.children }
        </div>
      </div>
    );
  }
}

TooltipHoverArea.propTypes = propTypes;

export default TooltipHoverArea;
