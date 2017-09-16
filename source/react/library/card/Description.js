import React from 'react';

const propTypes = {
  description: React.PropTypes.string.isRequired,
};

const CardDescription = props => (
  <div className="rc-card-description">{ props.description }</div>
);

CardDescription.propTypes = propTypes;

export default CardDescription;
