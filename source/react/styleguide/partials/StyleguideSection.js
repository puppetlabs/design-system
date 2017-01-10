import React from 'react';

const propTypes = {
  children: React.PropTypes.any,
  title: React.PropTypes.string,
};

const StyleguideSection = props => (
  <div className="sg-section">
    <div className="sg-section-title">{ props.title }</div>
    <div className="sg-section-content">
      { props.children }
    </div>
  </div>
);

StyleguideSection.propTypes = propTypes;

export default StyleguideSection;
