import React from 'react';
import classnames from 'classnames';

import TooltipHoverArea from './TooltipHoverArea';

const propTypes = {
  target: React.PropTypes.element.isRequired,
  className: React.PropTypes.string,
  anchor: React.PropTypes.string,
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
  ]),
};

const defaultProps = {
  anchor: 'bottom',
};

class Tooltip extends React.Component {
  constructor(props) {
    super(props);

    this.state = { position: { } };

    this.setPosition = this.setPosition.bind(this);
    this.setPositionRight = this.setPositionRight.bind(this);
    this.setPositionBottom = this.setPositionBottom.bind(this);
  }

  componentDidMount() {
    this.setPosition();
  }

  componentDidUpdate(newProps) {
    if (newProps.anchor !== this.props.anchor) {
      this.setPosition();
    }
  }

  setPosition() {
    const { target, anchor } = this.props;
    const tooltip = this.tooltip;

    if (target && tooltip) {
      switch (anchor) {
        case 'bottom':
          this.setPositionBottom(target);
          break;
        case 'right':
          this.setPositionRight(target);
          break;
        default:
          this.setPositionRight(target);
          break;
      }
    }
  }

  setPositionRight(target) {
    const elPosition = target.getBoundingClientRect();
    const offsetY = window.pageYOffset;

    const newState = { position: { } };

    newState.position.top = elPosition.top + offsetY;
    newState.position.left = elPosition.right + 10;

    this.setState(newState);
  }

  setPositionBottom(target) {
    const elPosition = target.getBoundingClientRect();
    const offsetY = window.pageYOffset;
    const tooltipWH = this.getTooltipWH();
    const tooltipWidth = tooltipWH.w;
    const tooltipHeight = tooltipWH.h;

    const newState = { position: { } };

    newState.position.top = elPosition.bottom + (tooltipHeight / 2) + (offsetY + 20);
    newState.position.left = (elPosition.left + (elPosition.width / 2)) - (tooltipWidth / 2);

    this.setState(newState);
  }

  getTooltipWH() {
    let w = 0;
    let h = 0;

    if (this.tooltip) {
      const rect = this.tooltip.getBoundingClientRect();

      w = rect.width;
      h = rect.height;
    }

    return { w, h };
  }

  render() {
    const { position } = this.state;
    const { anchor } = this.props;
    const className = classnames('rc-tooltip', `position-${anchor}`);

    return (
      <div className="rc-tooltip-container" style={ position } ref={ c => { this.tooltip = c; } }>
        <div className={ className }>
          { this.props.children }
        </div>
      </div>
    );
  }
}

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

export { TooltipHoverArea };
export default Tooltip;
