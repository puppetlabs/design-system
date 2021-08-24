import React from 'react';
import PropTypes from 'prop-types';
import StepperStep from './StepperStep';

const propTypes = {
  /** Main content where a collection of Steps can be passed */
  children: PropTypes.node,
  /** Denotes which step child in the collection is the 'active' step.
   * With this number we can also deduce which steps are 'incomplete' and 'complete' */
  activeStepIndex: PropTypes.number,
};

const defaultProps = {
  children: undefined,
  activeStepIndex: 0,
};

/** Stepper is a container that holds each step of a process */
const Stepper = ({ children, activeStepIndex }) => {
  const steps = React.Children.toArray(children);
  const stepsWithProps = steps.map((step, index) => {
    let statusType = '';

    if (activeStepIndex === index) {
      statusType += 'active';
    } else if (index > activeStepIndex) {
      statusType += 'incomplete';
    } else {
      statusType += 'complete';
    }
    return React.cloneElement(step, { statusType, stepNumber: index + 1 });
  });

  return <ol className="stepper-ol">{stepsWithProps}</ol>;
};

Stepper.propTypes = propTypes;
Stepper.defaultProps = defaultProps;

Stepper.Step = StepperStep;

export default Stepper;
