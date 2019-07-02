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

class FormSection extends React.Component {
  renderLegend() {
    const { title, tooltip, flyout } = this.props;

    let jsx = (
      <legend className="rc-form-section-legend">
        <span>{title}</span>
        {flyout}
      </legend>
    );

    if (tooltip) {
      jsx = (
        <TooltipHoverArea tooltip={tooltip} anchor="bottom">
          {jsx}
        </TooltipHoverArea>
      );
    }

    return jsx;
  }

  render() {
    const { children } = this.props;
    const legend = this.renderLegend();

    return (
      <fieldset className="rc-form-section">
        {legend}
        {children}
      </fieldset>
    );
  }
}

FormSection.propTypes = propTypes;
FormSection.defaultProps = defaultProps;

export default FormSection;
