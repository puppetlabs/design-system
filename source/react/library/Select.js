import React from 'react';
import classnames from 'classnames';
import RSelect from 'react-select';

const propTypes = {
  className: React.PropTypes.string,
};

const defaultProps = {
  className: undefined,
};

const Select = (props) => {
  const className = classnames('rc-select', props.className);

  return <RSelect { ...props } className={ className } />;
};

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
