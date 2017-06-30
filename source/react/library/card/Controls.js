import React from 'react';
import classnames from 'classnames';

const propTypes = {
  children: React.PropTypes.object,
  className: React.PropTypes.string,
};

const CardControls = (props) => {
  const className = classnames('rc-card-controls', props.className);

  return (
    <div className={ className } >
      { props.children }
    </div>
  );
};

CardControls.propTypes = propTypes;

export default CardControls;
