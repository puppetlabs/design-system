import { bool } from 'prop-types';
import React from 'react';

import Card from '.';
import { withControls } from '../../../styleguide/client/higherOrderComponents';
import { boolean } from '../../../styleguide/client/knobs';

const knobs = {
  link: boolean('Link', false),
};

const CardStyleguide = ({ link }) => (
  <div>
    <h1>Card</h1>
    <Card link={link}>Blah blah</Card>
  </div>
);

CardStyleguide.propTypes = {
  link: bool,
};

CardStyleguide.defaultProps = {
  link: false,
};

export default withControls({ knobs })(CardStyleguide);
