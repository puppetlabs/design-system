import { bool, string } from 'prop-types';
import React from 'react';

import Card from '.';
import { withControls } from '../../../styleguide/client/higherOrderComponents';
import { boolean, select } from '../../../styleguide/client/knobs';

const typeOptions = [
  { text: 'Primary', value: 'primary' },
  { text: 'Secondary', value: 'secondary' },
];

const knobs = {
  type: select('Type', typeOptions, 'primary'),
  link: boolean('Link', false),
};

const CardStyleguide = ({ link, type }) => (
  <div>
    <h1>Card</h1>
    <Card secondary={type === 'secondary'} link={link}>
      Lorem ipsum
    </Card>
  </div>
);

CardStyleguide.propTypes = {
  type: string,
  link: bool,
};

CardStyleguide.defaultProps = {
  type: 'primary',
  link: false,
};

export default withControls({ knobs })(CardStyleguide);
