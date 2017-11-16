import React from 'react';
import classnames from 'classnames';
import equals from 'deep-equal';
import portal from '../portal';

import TooltipHoverArea from './TooltipHoverArea';
import TooltipStickyArea from './TooltipStickyArea';
import Icon from '../Icon';

const propTypes = {
  className: React.PropTypes.string,
  anchor: React.PropTypes.string,
  sticky: React.PropTypes.bool,
  target: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.element,
  ]).isRequired,
  onClose: React.PropTypes.func,
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
  onClose: null,
  sticky: false,
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

  componentDidUpdate(prevProps) {
    if (prevProps.anchor !== this.props.anchor) {
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

    const newState = getDefaultState();

    newState.tooltipPosition.top = elPosition.bottom + (CARAT_HEIGHT * 2) + offsetY;
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

  renderCloseButton() {
    let jsx;

    if (this.props.sticky && this.props.onClose) {
      jsx = (
        <div role="button" className="rc-tooltip-close" onClick={ this.props.onClose }>
          <Icon height="8px" width="8px" type="close" />
        </div>
      );
    }

    return jsx;
  }

  render() {
    const { tooltipPosition, caratPosition } = this.state;
    const { anchor } = this.props;
    const className = classnames('rc-tooltip', `rc-tooltip-position-${anchor}`);
    const closeButton = this.renderCloseButton();

    if (this.props.width) {
      tooltipPosition.width = this.props.width;
    }

    return (
      <div className={ className } style={ tooltipPosition } ref={ c => { this.tooltip = c; } }>
        <div className="rc-tooltip-scrollbar-measurer" ref={ c => { this.scrollMeasurer = c; } } />
        <div className="rc-tooltip-carat" style={ caratPosition } />
        { this.props.children }
        { closeButton }
      </div>
    );
  }
}

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

export { TooltipHoverArea, TooltipStickyArea };
export default portal(Tooltip);
