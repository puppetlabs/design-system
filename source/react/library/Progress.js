import React from 'react';

const propTypes = {
  steps: React.PropTypes.number,
  active: React.PropTypes.number,
  width: React.PropTypes.number,
};

const defaultProps = {
  steps: 4,
  active: 1,
  width: 300,
};

/**
 * `Progress` displays the progress of a specific process.
 *
 * @example ../../../docs/Progress.md
 */

class Progress extends React.Component {
  constructor(props) {
    super(props);

    // TODO: Get this to work with various sizes, then move this to props.
    this.state = { stepSize: 10 };
  }

  renderLines() {
    const { width, steps } = this.props;
    const circleWidth = this.state.stepSize * 3;
    const lines = [];

    for (let n = 0; n < steps - 1; n++) {
      const lineWidth = (width / (steps - 1)) - circleWidth;

      const props = {
        y1: 15,
        x1: (circleWidth * (n + 1)) + (lineWidth * n),
        x2: ((circleWidth + lineWidth) * (n + 1)) + (circleWidth / 3),
        y2: 15,
        strokeWidth: 3,
        className: 'rc-progress-line',
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
    const { steps, width, active } = this.props;
    const { stepSize } = this.state;
    // Calculate how far on the x axis we should position this, based on the number of steps,
    // their size, and the width of the bar.
    const cx = ((width / (steps - 1)) * active) + (stepSize * 2);
    const mainProps = {
      cx: 0,
      cy: 15,
      r: 8,
      className: 'rc-progress-step rc-progress-step-active',
      style: {
        transform: `translateX(${cx}px)`,
      },
      key: 'main',
    };

    const shadowProps = {
      cx: 0,
      cy: 15,
      r: 15,
      fill: '#000',
      fillOpacity: 0.1,
      className: 'rc-progress-step rc-progress-step-active rc-progress-step-active-shadow',
      style: {
        transform: `translateX(${cx}px)`,
      },
      key: 'shadow',
    };

    return (
      <g key="active">
        <circle { ...mainProps } />
        <circle { ...shadowProps } />
      </g>
    );
  }

  renderStep(idx) {
    const { steps, width } = this.props;
    const { stepSize } = this.state;
    const props = {
      cx: ((width / (steps - 1)) * idx) + (stepSize * 2),
      cy: 15,
      r: 8, // TODO: Remove these hardcoded values
      fill: 'none',
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

    // Once we've rendered every step, let's also render the active step.
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
    const svgHeight = (stepSize * 3);

    return (
      <svg width={ svgWidth } height={ svgHeight } className="rc-progress">
        { line }
        { steps }
      </svg>
    );
  }
}

Progress.propTypes = propTypes;
Progress.defaultProps = defaultProps;

export default Progress;
