import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
  /** Section label that renders above section title */
  label: PropTypes.node,
  minimized: PropTypes.bool,
};

const defaultProps = {
  children: null,
  label: null,
};

const Section = props => {
  const { label: labelProp, children, minimized } = props;
  let label;
  let labelId;

  if (labelProp) {
    labelId = `nav-heading-${labelProp.toLowerCase().replace(/\s/, '-')}`;

    label = (
      <div id={labelId} className="rc-sidebar-label">
        {labelProp}
      </div>
    );
  }

  const revisedChildren = React.Children.map(children, child => {
    const newProps = {
      minimized,
    };

    return React.cloneElement(child, newProps);
  });

  return (
    <Fragment>
      {label}
      <ul aria-labelledby={labelId} className="rc-sidebar-section">
        {revisedChildren}
      </ul>
    </Fragment>
  );
};

Section.propTypes = propTypes;
Section.defaultProps = defaultProps;

export default Section;
