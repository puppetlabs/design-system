import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  title: PropTypes.string,
};

const defaultProps = {
  title: '',
};

const SectionLabel = props => {
  const { title } = props;

  return (
    <div>
      <span className="rc-sidebar-divider" />
      <span className="rc-sidebar-label">{title}</span>
    </div>
  );
};

SectionLabel.propTypes = propTypes;
SectionLabel.defaultProps = defaultProps;

export default SectionLabel;
