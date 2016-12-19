import React from 'react';

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

  renderLines() {
    const { width, color, steps } = this.props;
    const circleWidth = this.state.stepSize * 2;
    const lines = [];

    for (let n = 0; n < steps - 1; n++) {
      const lineWidth = (width / (steps - 1)) - circleWidth;

      const props = {
        y1: 15,
        x1: (circleWidth * (n + 1)) + (lineWidth * n),
        x2: (circleWidth + lineWidth) * (n + 1),
        y2: 15,
        stroke: color,
        strokeWidth: 3,
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

  renderActive() {
    const { steps, color, width, active } = this.props;
    const { stepSize } = this.state;
    const cx = ((width / (steps - 1)) * active) + stepSize;
    const props = {
      cx: 0,
      cy: 15,
      r: 10,
      fill: color,
      stroke: '#000',
      strokeOpacity: 0.1,
      strokeWidth: 6,
      className: 'rc-progress-step rc-progress-step-active',
      style: {
        transform: `translateX(${cx}px)`,
      },
      key: 'active',
    };

    return <circle { ...props } />;
  }

  renderStep(idx) {
    const { steps, color, width } = this.props;
    const { stepSize } = this.state;
    const props = {
      cx: ((width / (steps - 1)) * idx) + stepSize,
      cy: 15,
      r: 8,
      fill: 'none',
      stroke: color,
      strokeWidth: 4,
      className: 'rc-progress-step',
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

    circles.push(this.renderActive());

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
    const svgWidth = width + (stepSize * 4);
    const svgHeight = (stepSize * 4);
    const style = { padding: stepSize };

    return (
      <svg style={ style } width={ svgWidth } height={ svgHeight } className="rc-progress">
        { line }
        { steps }
      </svg>
    );
  }
}

Progress.propTypes = propTypes;
Progress.defaultProps = defaultProps;

export default Progress;
