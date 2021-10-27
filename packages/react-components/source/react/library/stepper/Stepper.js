import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import StepperStep from './StepperStep';
import { STEPPER_STATES } from '../../constants';

const propTypes = {
  /** Main content where a collection of Steps can be passed */
  children: PropTypes.node.isRequired,
  /** Denotes which step child in the collection is the 'active' step.
   * With this number we can also deduce which steps are 'incomplete' and 'complete' */
  activeStepIndex: PropTypes.number,
  /** Optional additional classnames */
  className: PropTypes.string,
};

const defaultProps = {
  activeStepIndex: 0,
  className: '',
};

/** Stepper is a container that holds each step of a process */
const Stepper = ({ children, activeStepIndex, className, ...props }) => {
  const steps = React.Children.toArray(children);
  const stepsWithProps = steps.map((step, index) => {
    let statusType = '';

    if (activeStepIndex === index) {
      statusType = STEPPER_STATES.active;
    } else if (index > activeStepIndex) {
      statusType = STEPPER_STATES.incomplete;
    } else {
      statusType = STEPPER_STATES.complete;
    }
    return React.cloneElement(step, { statusType, stepNumber: index + 1 });
  });

  return (
    <ol className={classNames('stepper-container', className)} {...props}>
      {stepsWithProps}
    </ol>
  );
};

Stepper.propTypes = propTypes;
Stepper.defaultProps = defaultProps;

Stepper.Step = StepperStep;

export default Stepper;
