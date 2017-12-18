import React from 'react';

const propTypes = {
  title: React.PropTypes.string,
  children: React.PropTypes.any,
};

const defaultProps = {
  title: null,
  children: null,
};

class FormSection extends React.Component {
  render() {
    return (
      <fieldset className="rc-form-section">
        <legend className="rc-form-section-legend">{ this.props.title }</legend>
        { this.props.children }
      </fieldset>
    );
  }
}

FormSection.propTypes = propTypes;
FormSection.defaultProps = defaultProps;

export default FormSection;
