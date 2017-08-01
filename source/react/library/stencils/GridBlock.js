import React from 'react';
import Icon from '../Icon';

const propTypes = {
  coords: React.PropTypes.object,
  type: React.PropTypes.string,
};

const GridBlock = (props) => {
  const { x, y, w, h } = props.coords;
  const type = props.type === 'bar' ? 'bars' : props.type;

  return (
    <svg x={ x } y={ y } width={ w } height={ h } >
      <rect className="rc-grid-block" x="0" y="0" rx="5" ry="5" width={ w } height={ h } />
      <svg className={ `rc-grid-block-${props.type} rc-grid-block-icon-container` } x="12.5%" y="12.5%">
        <Icon type={ type } height={ `${0.75 * h}` } width={ `${0.75 * w}` } />
      </svg>
    </svg>
  );
};

GridBlock.propTypes = propTypes;

export default GridBlock;
