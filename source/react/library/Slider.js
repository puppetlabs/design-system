import React from 'react';
import classnames from 'classnames';

const propTypes = {
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  step: React.PropTypes.number,
  value: React.PropTypes.number,
};

const defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  value: 0,
};

/**
 * `Slider` is a component used for selecting a number on a defined scale.
 *
 * @example ../../../docs/Slider.md
 */

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
      value: props.value,
    };

    this.onChange = this.onChange.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  componentWillMount() {
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  componentDidMount() {
    if (this.state.value) {
      const position = this.calculateHandlePosition();
      this.setHandlePosition(position);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value === this.state.value) {
      this.setState({ value: nextProps.value });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value) {
      const position = this.calculateHandlePosition();
      this.setHandlePosition(position);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  onChange(value) {
    console.log(value);
  }

  onMouseDown() {
    this.setState({ dragging: true });
  }

  onMouseMove(e) {
    if (this.state.dragging) {
      let mousePos = e.pageX;
      const sliderRect = this.getSliderRect();
      const handleRect = this.getHandleRect();
      const sliderStart = sliderRect.left;
      const sliderEnd = sliderRect.right;

      const endValue = sliderEnd - sliderStart;

      if (mousePos < sliderStart) {
        mousePos = sliderStart;
      } else if (mousePos > sliderEnd) {
        mousePos = sliderEnd;
      }

      const handlePos = mousePos - sliderStart;
      const handleOffset = handleRect.width / 2;
      const adjustedHandlePos = handlePos - handleOffset;

      const percentage = handlePos / endValue;
      const value = this.props.max * percentage;

      this.barActive.style.width = `${handlePos}px`;
      this.handle.style.left = `${adjustedHandlePos}px`;

      this.onChange(value);
    }
  }

  onMouseUp() {
    this.setState({ dragging: false });
  }

  getSliderRect() {
    return this.slider ? this.slider.getBoundingClientRect() : {};
  }

  getHandleRect() {
    return this.handle ? this.handle.getBoundingClientRect() : {};
  }

  getSliderLength(sliderRect) {
    if (!sliderRect) {
      sliderRect = this.getSliderRect();
    }

    const start = sliderRect.left;
    const end = sliderRect.right;

    return end - start;
  }

  setHandlePosition(position, handleRect) {
    if (!handleRect) {
      handleRect = this.getHandleRect();
    }

    const handleOffset = handleRect.width / 2;

    this.barActive.style.width = `${position}px`;
    this.handle.style.left = `${position - handleOffset}px`;
  }

  calculateHandlePosition() {
    const min = this.props.min;

    // We remove the min from the max and value to ensure we offset for non zero values
    const max = this.props.max - min;
    const value = this.state.value - min;

    const percentage = value / max;
    const sliderRect = this.getSliderRect();
    const sliderLength = this.getSliderLength(sliderRect);
    const position = sliderLength * percentage;

    return position;
  }

  render() {
    const className = classnames('rc-slider');

    return (
      <div ref={ (c) => { this.slider = c; } } className={ className }>
        <div className="rc-slider-bar" />
        <div ref={ (c) => { this.barActive = c; } } className="rc-slider-bar-active" />
        <div
          ref={ (c) => { this.handle = c; } }
          onMouseDown={ this.onMouseDown }
          onMouseUp={ this.onMouseUp }
          className="rc-slider-handle"
        />
      </div>
    );
  }
}

Slider.propTypes = propTypes;
Slider.defaultProps = defaultProps;

export default Slider;
