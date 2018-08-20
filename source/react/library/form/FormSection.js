import PropTypes from 'prop-types';
import React from 'react';

import { TooltipHoverArea } from '../tooltips/Tooltip';

const propTypes = {
  title: PropTypes.string,
  tooltip: PropTypes.string,
  children: PropTypes.any,
  flyout: PropTypes.any,
};

const defaultProps = {
  title: null,
  tooltip: null,
  children: null,
};

class FormSection extends React.Component {
  renderLegend() {
    const { title, tooltip } = this.props;

    let jsx = (
      <legend className="rc-form-section-legend">
        <span>{title}</span>
        {this.props.flyout}
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
    const legend = this.renderLegend();

    return (
      <fieldset className="rc-form-section">
        {legend}
        {this.props.children}
      </fieldset>
    );
  }
}

FormSection.propTypes = propTypes;
FormSection.defaultProps = defaultProps;

export default FormSection;
