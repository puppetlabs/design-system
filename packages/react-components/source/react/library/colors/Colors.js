import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

// The sole puprose of this component is to render color swatches for the styleguide
// This is not to be exported for consumption.
const Colors = ({ colors }) => {
  const components = [];
  let i = 0;

  for (i; i < colors.length; i += 1) {
    components.push(
      <div key={colors[i]} className="swatch">
        <div className={`swatch-color swatch-color-${colors[i]}`} />
        <div className="swatch-title">{colors[i]}</div>
      </div>,
    );
  }

  return <div className="swatch-wrapper">{components}</div>;
};

Colors.propTypes = propTypes;

export default Colors;
