import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Text from '../text';
import Icon from '../icon';
import { STEPPER_STATES } from '../../constants';

const propTypes = {
  /** Main content for a step */
  children: PropTypes.node.isRequired,
  /** Optional text */
  subText: PropTypes.string,
  /** Optional additional classnames */
  className: PropTypes.string,
  /** Set internally. Depending on where the activeStepIndex is this will be 'Active', 'Incomplete', or 'Complete' */
  statusType: PropTypes.string,
  /** Set internally. This is used to render the number of each step. */
  stepNumber: PropTypes.number,
};

const defaultProps = {
  subText: '',
  statusType: '',
  className: '',
  stepNumber: undefined,
};

const stepType = (children, type, stepNumber, subText) => {
  if (type === STEPPER_STATES.active || type === STEPPER_STATES.incomplete) {
    return (
      <>
        <div className="stepper-number">
          <div className={`${type}-number`}>{stepNumber}</div>
        </div>
        <Text className={`stepper-text-${type}`}>{children}</Text>
        {subText.length > 0 ? (
          <Text className={`stepper-subtext-${type}`}>{subText}</Text>
        ) : null}
      </>
    );
  }
  if (type === STEPPER_STATES.complete) {
    return (
      <>
        <div className="stepper-number">
          <div className="complete-icon-wrapper">
            <Icon type="check-circle" />
          </div>
        </div>
        <Text className={`stepper-text-${type}`}>{children}</Text>
        {subText.length > 0 ? (
          <Text className={`stepper-subtext-${type}`}>{subText}</Text>
        ) : null}
      </>
    );
  }
  return null;
};

const StepperStep = ({
  children,
  statusType,
  stepNumber,
  subText,
  className,
  ...props
}) => (
  <li className={classNames(statusType, className)} {...props}>
    {stepType(children, statusType, stepNumber, subText)}
  </li>
);
StepperStep.propTypes = propTypes;
StepperStep.defaultProps = defaultProps;
export default StepperStep;
