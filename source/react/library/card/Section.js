import React from 'react';
import classnames from 'classnames';

const propTypes = {
  children: React.PropTypes.any,
  className: React.PropTypes.string,
};

const defaultProps = {
  children: [],
  className: '',
};

const CardSection = (props) => {
  const { children, className: classProp } = props;
  const className = classnames('rc-card-section', classProp);

  return (
    <div className={ className } >
      { children }
    </div>
  );
};

CardSection.propTypes = propTypes;
CardSection.defaultProps = defaultProps;

export default CardSection;
