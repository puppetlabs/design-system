import React from 'react';

const propTypes = {
  title: React.PropTypes.string,
  children: React.PropTypes.any,
};

const defaultProps = {
  title: null,
  children: null,
};

const FormSection = props => (
  <fieldset className="rc-form-section">
    <legend className="rc-form-section-legend">{ props.title }</legend>
    { props.children }
  </fieldset>
);

FormSection.propTypes = propTypes;
FormSection.defaultProps = defaultProps;

export default FormSection;
