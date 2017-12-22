import React from 'react';
import classnames from 'classnames';

const propTypes = {
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  step: React.PropTypes.number,
  defaultValue: React.PropTypes.number,
  onChange: React.PropTypes.func,
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
      value: props.defaultValue,
    };

    this.onResize = this.onResize.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  componentWillMount() {
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('resize', this.onResize);
  }

  componentDidMount() {
    if (this.state.value) {
      const position = this.calculateHandlePosition(this.state.value);
      this.setHandlePosition(position);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value) {
      const position = this.calculateHandlePosition(this.state.value);
      this.setHandlePosition(position);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('resize', this.onResize);
  }

  onResize() {
    const position = this.calculateHandlePosition(this.state.value);
    this.setHandlePosition(position);
  }

  onClick(e) {
    this.onMouseMove(e, true);
  }

  onChange(value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  onMouseDown() {
    this.setState({ dragging: true });
  }

  onMouseMove(e, clicked = false) {
    if (this.state.dragging || clicked) {
      let mousePos = e.pageX;

      const sliderRect = this.getSliderRect();
      const sliderStart = sliderRect.left;
      const sliderEnd = sliderRect.right;

      if (mousePos < sliderStart) {
        mousePos = sliderStart;
      } else if (mousePos > sliderEnd) {
        mousePos = sliderEnd;
      }

      let handlePos = mousePos - sliderStart;

      if (this.props.step) {
        const stepPoints = this.convertStepToPoints();
        const stepPositions = stepPoints.map(p => p.position);

        const closestPoint = stepPositions.reduce((prev, next) => (
          (Math.abs(next - handlePos) < Math.abs(prev - handlePos) ? next : prev)
        ));

        handlePos = closestPoint;
      }

      const endPos = sliderEnd - sliderStart;
      const percentage = handlePos / endPos;

      // get the middle of the difference between the max and min values.
      // Once we have the middle add the min back on
      const value = ((this.props.max - this.props.min) * percentage) + this.props.min;

      this.setState({ value }, () => {
        this.onChange(value);
      });
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

  calculateHandlePosition(value) {
    const min = this.props.min;

    // We remove the min from the max and value to ensure we offset for non zero values
    const offsetMax = this.props.max - min;
    const offsetValue = value - min;

    const percentage = offsetValue / offsetMax;
    const sliderRect = this.getSliderRect();
    const sliderLength = this.getSliderLength(sliderRect);
    const position = sliderLength * percentage;

    return position;
  }

  convertStepToPoints() {
    const { min, max, step } = this.props;
    const points = [];

    for (let i = min; i <= max; i += step) {
      points.push({
        value: i,
        position: this.calculateHandlePosition(i),
      });
    }

    return points;
  }

  render() {
    const className = classnames('rc-slider');

    return (
      <div ref={ (c) => { this.slider = c; } } className={ className } onClick={ this.onClick }>
        <div className="rc-slider-bar" />
        <div ref={ (c) => { this.barActive = c; } } className="rc-slider-bar-active" />
        <div
          ref={ (c) => { this.handle = c; } }
          tabIndex={ 0 }
          role="slider"
          aria-valuemin={ this.props.min }
          aria-valueMax={ this.props.max }
          aria-valueNow={ this.state.value }
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
