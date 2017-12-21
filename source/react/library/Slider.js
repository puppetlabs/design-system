import React from 'react';
import classnames from 'classnames';

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

  onChange() {
    console.log(this);
  }

  onMouseDown(e) {
    this.setState({ dragging: true });
  }

  onMouseMove(e) {
    if (this.state.dragging) {
      let mousePos = e.pageX;
      const sliderRect = this.slider.getBoundingClientRect();
      const sliderStart = sliderRect.left;
      const sliderEnd = sliderRect.right;

      if (mousePos < sliderStart) {
        mousePos = sliderStart;
      } else if (mousePos > sliderEnd) {
        mousePos = sliderEnd;
      }

      const handlePos = mousePos - sliderStart;

      this.barActive.style.width = `${handlePos}px`;
      this.handle.style.left = `${handlePos}px`;
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

export default Slider;
