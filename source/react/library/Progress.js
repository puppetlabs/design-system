import React from 'react';

const propTypes = {
  color: React.PropTypes.string,
  steps: React.PropTypes.number,
  active: React.PropTypes.number,
  width: React.PropTypes.width,
};

const defaultProps = {
  color: '#009cf6',
  steps: 5,
  active: 1,
  width: 400,
};

class Progress extends React.Component {
  constructor(props) {
    super(props);

    // TODO: Get this to work with various sizes, then move this to props.
    this.state = { stepSize: 10 };
  }

  renderLine() {
    const { width, color } = this.props;
    const { stepSize } = this.state;

    const props = {
      y1: stepSize,
      x1: stepSize,
      x2: width + stepSize,
      y2: stepSize,
      style: { stroke: color, strokeWidth: 3 },
    };

    return <line { ...props } />;
  }

  renderStep(idx) {
    const { steps, color, active, width } = this.props;
    const { stepSize } = this.state;
    const isActive = active === idx;
    const props = {
      cx: ((width / (steps - 1)) * idx) + stepSize,
      cy: 10,
      r: 6,
      fill: isActive ? color : 'white',
      stroke: color,
      strokeWidth: isActive ? 6 : 4,
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
      <g>
        { circles }
      </g>
    );
  }

  render() {
    const line = this.renderLine();
    const steps = this.renderSteps();
    const { width } = this.props;
    const { stepSize } = this.state;
    const svgWidth = width + (stepSize * 2);

    return (
      <svg width={ svgWidth } height={ stepSize * 2 }>
        { line }
        { steps }
      </svg>
    );
  }
}

Progress.propTypes = propTypes;
Progress.defaultProps = defaultProps;

export default Progress;
