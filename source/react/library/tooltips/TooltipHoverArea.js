import React from 'react';

import Tooltip from './Tooltip';
import FadeInAndOut from '../FadeInAndOut';

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

/**
 * `TooltipHoverArea` allows you to define a zone that a tooltip will be rendered next to
 * when the zone has been hovered over.
 */
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

  onMouseOver(e) {
    this.setState({ open: true });
  }

  onMouseOut() {
    this.setState({ open: false });
  }

  renderTooltip() {
    if (!this.elem) {
      return null;
    }

    return (
      <Tooltip target={ this.elem } anchor={ this.props.anchor }>
        { this.props.tooltip }
      </Tooltip>
    );
  }

  render() {
    let tooltip = null;

    tooltip = this.renderTooltip();

    return (
      <div
        className="rc-tooltip-area rc-tooltip-area-hover"
        role={ this.onClick ? 'button' : null }
        onClick={ this.onClick }
        onMouseEnter={ this.onMouseOver }
        onMouseOut={ this.onMouseOut }
        ref={ (c) => { this.elem = c; } }
      >
        <FadeInAndOut in={ this.state.open }>
          { tooltip }
        </FadeInAndOut>
        { this.props.children }
      </div>
    );
  }
}

TooltipHoverArea.propTypes = propTypes;

export default TooltipHoverArea;
