import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import { bindParentScroll, unbindParentScroll } from '../../helpers/statics';
import portal from '../portal';
import TooltipHoverArea from './TooltipHoverArea';
import TooltipStickyArea from './TooltipStickyArea';
import Icon from '../icon/Icon';
import { ENTER_KEY_CODE } from '../../constants';

const CARAT_HEIGHT = 8;

const propTypes = {
  anchor: PropTypes.string,
  sticky: PropTypes.bool,
  style: PropTypes.shape({}),
  target: PropTypes.oneOfType([PropTypes.object, PropTypes.element]).isRequired,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

const defaultProps = {
  sticky: false,
  style: {},
  anchor: 'right',
  onClose: null,
  children: null,
};

const getDefaultState = () => ({
  onClose: null,
  sticky: false,
  tooltipPosition: {},
  caratPosition: {},
});

class Tooltip extends React.Component {
  constructor(props) {
    super(props);

    this.state = getDefaultState();

    this.onResize = this.onResize.bind(this);
    this.onHandleKeyDown = this.onHandleKeyDown.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.setPositionRight = this.setPositionRight.bind(this);
    this.setPositionBottom = this.setPositionBottom.bind(this);
  }

  componentDidMount() {
    const { target } = this.props;

    this.setPosition();

    window.addEventListener('resize', this.onResize);

    if (target) {
      bindParentScroll(target, this.setPosition);
    }
  }

  componentDidUpdate(prevProps) {
    const { anchor } = this.props;

    if (prevProps.anchor !== anchor) {
      this.setPosition();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    const { target } = this.props;

    if (target) {
      unbindParentScroll(target, this.setPosition);
    }
  }

  onResize() {
    this.setPosition();
  }

  onHandleKeyDown(e) {
    const { onClose } = this.props;

    if (e.keyCode === ENTER_KEY_CODE && onClose) {
      onClose();
    }
  }

  getScrollbarWidth() {
    const measurer = this.scrollMeasurer;

    return measurer.clientWidth - measurer.scrollWidth;
  }

  setPosition() {
    const { target, anchor } = this.props;
    const { tooltip } = this;

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

    const elPositionMiddle = elPosition.top + elPosition.height / 2;
    newState.tooltipPosition.top =
      elPositionMiddle - tooltipHeight / 2 + offsetY;
    newState.tooltipPosition.left = elPosition.right + CARAT_HEIGHT * 2;

    newState.caratPosition.top = tooltipHeight / 2 - CARAT_HEIGHT;

    this.setState(newState);
  }

  setPositionBottom(target) {
    const elPosition = target.getBoundingClientRect();
    const offsetY = window.pageYOffset;
    const scrollWidth = this.getScrollbarWidth();
    const tooltipWH = this.getTooltipWH();
    const tooltipWidth = tooltipWH.w;
    const newState = getDefaultState();

    newState.tooltipPosition.top =
      elPosition.bottom + CARAT_HEIGHT * 2 + offsetY;
    newState.tooltipPosition.left =
      elPosition.left + elPosition.width / 2 - tooltipWidth / 2 + scrollWidth;

    newState.caratPosition.left = tooltipWidth / 2 - CARAT_HEIGHT;

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
    const { sticky, onClose } = this.props;

    if (sticky && onClose) {
      jsx = (
        <div
          role="button"
          tabIndex={0}
          className="rc-tooltip-close"
          onClick={onClose}
          onKeyDown={this.onHandleKeyDown}
        >
          <Icon type="close" size="tiny" />
        </div>
      );
    }

    return jsx;
  }

  render() {
    const { tooltipPosition, caratPosition } = this.state;
    const { anchor, style, children } = this.props;
    const className = classnames('rc-tooltip', `rc-tooltip-position-${anchor}`);
    const closeButton = this.renderCloseButton();

    const styles = { ...tooltipPosition, ...style };

    return (
      <div
        className={className}
        style={styles}
        ref={c => {
          this.tooltip = c;
        }}
      >
        <div
          className="rc-tooltip-scrollbar-measurer"
          ref={c => {
            this.scrollMeasurer = c;
          }}
        />
        <div className="rc-tooltip-carat" style={caratPosition} />
        {children}
        {closeButton}
      </div>
    );
  }
}

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

export { TooltipHoverArea, TooltipStickyArea };
export default portal(Tooltip);
