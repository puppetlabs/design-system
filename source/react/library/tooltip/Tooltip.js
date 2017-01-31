import React from 'react';
import classnames from 'classnames';

import TooltipHoverArea from './TooltipHoverArea';

const propTypes = {
  target: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.element,
  ]).isRequired,
  className: React.PropTypes.string,
  anchor: React.PropTypes.string,
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
  ]),
};

const CARAT_HEIGHT = 8;

const defaultProps = {
  anchor: 'right',
};

const getDefaultState = () => ({
  tooltipPosition: { },
  caratPosition: { },
});

class Tooltip extends React.Component {
  constructor(props) {
    super(props);

    this.state = getDefaultState();

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
        default:
          this.setPositionRight(target);
          break;
      }
    }
  }

  setPositionRight(target) {
    const elPosition = target.getBoundingClientRect();
    const offsetY = window.pageYOffset;
    const tooltipWH = this.getTooltipWH();
    const tooltipHeight = tooltipWH.h;

    const newState = getDefaultState();

    const elPositionMiddle = (elPosition.top + (elPosition.height / 2));
    newState.tooltipPosition.top = (elPositionMiddle - (tooltipHeight / 2)) + offsetY;
    newState.tooltipPosition.left = elPosition.right + (CARAT_HEIGHT * 2);

    newState.caratPosition.top = (tooltipHeight / 2) - CARAT_HEIGHT;

    this.setState(newState);
  }

  setPositionBottom(target) {
    const elPosition = target.getBoundingClientRect();
    const offsetY = window.pageYOffset;
    const tooltipWH = this.getTooltipWH();
    const tooltipWidth = tooltipWH.w;
    const tooltipHeight = tooltipWH.h;

    const newState = getDefaultState();

    newState.tooltipPosition.top = elPosition.bottom + (tooltipHeight / 2) + offsetY;
    newState.tooltipPosition.left = (elPosition.left + (elPosition.width / 2)) - (tooltipWidth / 2);

    newState.caratPosition.left = (tooltipWidth / 2) - CARAT_HEIGHT;

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
    const { tooltipPosition, caratPosition } = this.state;
    const { anchor } = this.props;
    const className = classnames('rc-tooltip', `rc-tooltip-position-${anchor}`);

    return (
      <div className={ className } style={ tooltipPosition } ref={ c => { this.tooltip = c; } }>
        <div className="rc-tooltip-carat" style={ caratPosition } />
        { this.props.children }
      </div>
    );
  }
}

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

export { TooltipHoverArea };
export default Tooltip;
