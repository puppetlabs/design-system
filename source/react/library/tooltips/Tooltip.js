import React from 'react';
import classnames from 'classnames';
import portal from '../portal';

import TooltipHoverArea from './TooltipHoverArea';
import TooltipStickyArea from './TooltipStickyArea';

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

    this.onResize = this.onResize.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.setPositionRight = this.setPositionRight.bind(this);
    this.setPositionBottom = this.setPositionBottom.bind(this);
  }

  componentDidMount() {
    this.setPosition();

    window.addEventListener('resize', this.onResize);
  }

  componentDidUpdate(newProps) {
    if (newProps.anchor !== this.props.anchor) {
      this.setPosition();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize() {
    this.setPosition();
  }

  getScrollbarWidth() {
    const measurer = this.scrollMeasurer;

    console.warn(measurer.offsetWidth - measurer.clientWidth);
    return measurer.offsetWidth - measurer.clientWidth;
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
    const scrollWidth = this.getScrollbarWidth();
    const tooltipWH = this.getTooltipWH();
    const tooltipWidth = tooltipWH.w;
    const tooltipHeight = tooltipWH.h;

    const newState = getDefaultState();

    newState.tooltipPosition.top = elPosition.bottom + (tooltipHeight / 2) + offsetY;
    newState.tooltipPosition.left =
      ((elPosition.left + (elPosition.width / 2)) - (tooltipWidth / 2)) + scrollWidth;

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
        <div className="rc-tooltip-scrollbar-measurer" ref={ c => { this.scrollMeasurer = c; } } />
        <div className="rc-tooltip-carat" style={ caratPosition } />
        { this.props.children }
      </div>
    );
  }
}

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

export { TooltipHoverArea, TooltipStickyArea };
export default portal(Tooltip);
