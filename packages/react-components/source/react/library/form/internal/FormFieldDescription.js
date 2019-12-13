import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../icon';

const propTypes = {
  /** Form error, causing element to render red when present */
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /** Expanded explainer for the field */
  description: PropTypes.string,
};

const defaultProps = {
  error: '',
  description: '',
};

const FormFieldDescription = ({ error, description }) => {
  const message = error && typeof error === 'string' ? error : description;
  const iconType = error ? 'alert' : 'info-circle';

  if (message) {
    return (
      <div className="rc-form-field-description">
        <Icon
          className="rc-form-field-description-icon"
          size="small"
          type={iconType}
        />
        {message}
      </div>
    );
  }

  return null;
};

FormFieldDescription.propTypes = propTypes;
FormFieldDescription.defaultProps = defaultProps;

export default FormFieldDescription;
