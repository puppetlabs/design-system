import React from 'react';
import classnames from 'classnames';

const propTypes = {
  highlighted: React.PropTypes.bool,
  value: React.PropTypes.string,
};

const defaultProps = {
  highlighted: false,
  value: null,
};

const SelectItem = (props) => {
  const className = classnames('rc-select-item', {
    'rc-select-item-highlighted': props.highlighted,
  });

  return (
    <div className={ className }>
      <span>{ props.value }</span>
    </div>
  );
};

SelectItem.propTypes = propTypes;
SelectItem.defaultProps = defaultProps;

export default SelectItem;
