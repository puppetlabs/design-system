import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  title: PropTypes.string,
};

const defaultProps = {
  title: '',
};

class SectionLabel extends React.Component {
  render() {
    return (
      <div>
        <span className="rc-sidebar-divider" />
        <span className="rc-sidebar-label">{this.props.title}</span>
      </div>
    );
  }
}

SectionLabel.propTypes = propTypes;
SectionLabel.defaultProps = defaultProps;

export default SectionLabel;
