import React from 'react';
import PropTypes from 'prop-types';
import renderChildren from './helper';

const propTypes = {
  children: PropTypes.node, // eslint-disable-line
  /** Section label that renders above section title */
  label: PropTypes.node,
  minimized: PropTypes.bool, // eslint-disable-line
};

const defaultProps = {
  children: null,
  label: null,
  minimized: false,
};

const SidebarSection = (props) => {
  const { label: labelProp } = props;
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

  const revisedChildren = renderChildren(props);

  return (
    <>
      {label}
      <ul aria-labelledby={labelId} className="rc-sidebar-section">
        {revisedChildren}
      </ul>
    </>
  );
};

SidebarSection.propTypes = propTypes;
SidebarSection.defaultProps = defaultProps;

export default SidebarSection;
