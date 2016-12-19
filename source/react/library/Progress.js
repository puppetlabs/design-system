import React from 'react';
import classnames from 'classnames';

const propTypes = {
  color: React.PropTypes.string,
  steps: React.PropTypes.number,
  active: React.PropTypes.number,
  width: React.PropTypes.number,
};

const defaultProps = {
  color: '#009cf6',
  steps: 4,
  active: 1,
  width: 300,
};

class Progress extends React.Component {
  constructor(props) {
    super(props);

    // TODO: Get this to work with various sizes, then move this to props.
    this.state = { stepSize: 10 };
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps.active, this.props.active);
  }

  renderLines() {
    const { width, color, steps } = this.props;
    const circleWidth = this.state.stepSize * 2;
    const lines = [];

    for (let n = 0; n < steps - 1; n++) {
      const lineWidth = (width / (steps - 1)) - circleWidth;

      const props = {
        y1: this.state.stepSize,
        x1: (circleWidth * (n + 1)) + (lineWidth * n),
        x2: (circleWidth + lineWidth) * (n + 1),
        y2: this.state.stepSize,
        style: { stroke: color, strokeWidth: 3 },
        key: n,
      };

      lines.push(<line { ...props } />);
    }

    return (
      <g className="rc-progress-lines">
        { lines }
      </g>
    );
  }

  renderStep(idx) {
    const { steps, color, active, width } = this.props;
    const { stepSize } = this.state;
    const isActive = active === idx;
    const props = {
      cx: ((width / (steps - 1)) * idx) + stepSize,
      cy: 10,
      r: isActive ? 7 : 8,
      fill: isActive ? color : 'none',
      stroke: color,
      strokeWidth: isActive ? 6 : 4,
      className: classnames('rc-progress-step', { 'rc-progress-step-active': isActive }),
      key: idx,
    };

    return <circle { ...props } />;
  }

  renderSteps() {
    const steps = this.props.steps;
    const circles = [];

    for (let n = 0; n < steps; n++) {
      circles.push(this.renderStep(n));
    }

    return (
      <g className="rc-progress-steps">
        { circles }
      </g>
    );
  }

  render() {
    const line = this.renderLines();
    const steps = this.renderSteps();
    const { width } = this.props;
    const { stepSize } = this.state;
    const svgWidth = width + (stepSize * 2);

    return (
      <svg width={ svgWidth } height={ stepSize * 2 } className="rc-progress">
        { line }
        { steps }
      </svg>
    );
  }
}

Progress.propTypes = propTypes;
Progress.defaultProps = defaultProps;

export default Progress;
