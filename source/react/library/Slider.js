import React from 'react';
import classnames from 'classnames';

const propTypes = {
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  step: React.PropTypes.number,
};

const defaultProps = {
  min: 0,
  max: 100,
  step: 1,
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
      value: 0,
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

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  onChange(value) {
    console.log(value);
  }

  onMouseDown(e) {
    this.setState({ dragging: true });
  }

  onMouseMove(e) {
    if (this.state.dragging) {
      let mousePos = e.pageX;
      const sliderRect = this.slider.getBoundingClientRect();
      const handleRect = this.handle.getBoundingClientRect();
      const sliderStart = sliderRect.left;
      const sliderEnd = sliderRect.right;

      const endValue = sliderEnd - sliderStart;

      if (mousePos < sliderStart) {
        mousePos = sliderStart;
      } else if (mousePos > sliderEnd) {
        mousePos = sliderEnd;
      }

      const handlePos = Math.round(mousePos - sliderStart);
      const handleOffset = handleRect.width / 2;
      const adjustedHandlePos = handlePos - handleOffset;

      const percentage = handlePos / endValue;
      const value = this.props.max * percentage;

      this.barActive.style.width = `${adjustedHandlePos}px`;
      this.handle.style.left = `${adjustedHandlePos}px`;

      this.onChange(value);
    }
  }

  onMouseUp(e) {
    this.setState({ dragging: false });
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
