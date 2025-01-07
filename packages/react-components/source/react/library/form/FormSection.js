import PropTypes from 'prop-types';
import React from 'react';

import TooltipHoverArea from '../tooltips/TooltipHoverArea';

const propTypes = {
  title: PropTypes.string,
  tooltip: PropTypes.string,
  children: PropTypes.node,
  flyout: PropTypes.element,
};

const defaultProps = {
  title: null,
  tooltip: null,
  children: null,
  flyout: null,
};

// eslint-disable-next-line react/prop-types
const FormSectionLegend = ({ title, tooltip, flyout }) => {
  const legend = (
    <legend className="rc-form-section-legend">
      <span>{title}</span>
      {flyout}
    </legend>
  );

  if (tooltip) {
    return (
      <TooltipHoverArea tooltip={tooltip} anchor="bottom">
        {legend}
      </TooltipHoverArea>
    );
  }

  return legend;
};

const FormSection = ({ title, tooltip, flyout, children }) => (
  <fieldset className="rc-form-section">
    <FormSectionLegend title={title} tooltip={tooltip} flyout={flyout} />
    {children}
  </fieldset>
);

FormSection.propTypes = propTypes;
FormSection.defaultProps = defaultProps;

export default FormSection;
