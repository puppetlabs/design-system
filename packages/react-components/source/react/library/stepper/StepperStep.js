import React from 'react';
import PropTypes from 'prop-types';
import Text from '../text';
import Icon from '../icon';

const propTypes = {
  /** Main content for a step */
  children: PropTypes.node,
  /** Optional text */
  subText: PropTypes.string,
  /** Set internally. Depending on where the activeStepIndex is this will be 'Active', 'Incomplete', or 'Complete' */
  statusType: PropTypes.string,
  /** Set internally. This is used to render the number of each step. */
  stepNumber: PropTypes.number,
};

const defaultProps = {
  children: undefined,
  subText: '',
  statusType: '',
  stepNumber: undefined,
};

const stepType = (children, type, stepNumber, subText) => {
  if (type === 'active' || type === 'incomplete') {
    return (
      <>
        <div className="stepper-number">
          <div className={`${type}-number`}>{stepNumber}</div>
        </div>
        <Text className={`stepper-text-${type}`}>{children}</Text>
        <Text className={`stepper-subtext-${type}`}>{subText}</Text>
      </>
    );
  }
  if (type === 'complete') {
    return (
      <>
        <div className="stepper-number">
          <div className="complete-icon-wrapper">
            <Icon type="check-circle" />
          </div>
        </div>
        <Text className={`stepper-text-${type}`}>{children}</Text>
        <Text className={`stepper-subtext-${type}`}>{subText}</Text>
      </>
    );
  }
  return null;
};

const StepperStep = ({ children, statusType, stepNumber, subText }) => {
  return (
    <li className={`${statusType}`}>
      {stepType(children, statusType, stepNumber, subText)}
    </li>
  );
};
StepperStep.propTypes = propTypes;
StepperStep.defaultProps = defaultProps;
export default StepperStep;
