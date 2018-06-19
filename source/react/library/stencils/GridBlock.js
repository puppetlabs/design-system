import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../icon/Icon';

const propTypes = {
  coords: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

const GridBlock = (props) => {
  const { x, y, w, h } = props.coords;

  return (
    <svg x={ x } y={ y } width={ w } height={ h } >
      <rect className="rc-grid-block" x="0" y="0" rx="5" ry="5" width={ w } height={ h } />
      <svg className={ `rc-grid-block-${props.type} rc-grid-block-icon-container` } x="25%" y="25%">
        <Icon type={ props.type } height={ `${0.5 * h}px` } width={ `${0.5 * w}px` } />
      </svg>
    </svg>
  );
};

GridBlock.propTypes = propTypes;

export default GridBlock;
