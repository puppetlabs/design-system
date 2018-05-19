import { bool, string } from 'prop-types';
import React from 'react';

import Link from '.';
import { withControls } from '../../../styleguide/client/higherOrderComponents';
import { boolean, select, text } from '../../../styleguide/client/knobs';

const typeOptions = [
  { text: 'Primary', value: 'primary' },
  { text: 'Secondary', value: 'secondary' },
];

const knobs = {
  type: select('Type', typeOptions, 'primary'),
  content: text('Content', 'Link'),
  to: text('To', '.'),
  button: boolean('As button', false),
  disabled: boolean('Disabled', false),
};

const LinkStyleguide = ({ content, to, button, disabled }) => (
  <div>
    <h1>Link</h1>
    <Link to={to} button={button} disabled={disabled}>
      {content}
    </Link>
  </div>
);

LinkStyleguide.propTypes = {
  content: string,
  to: string,
  button: bool,
  disabled: bool,
};

LinkStyleguide.defaultProps = {
  content: '',
  to: '',
  button: false,
  disabled: false,
};

export default withControls({ knobs })(LinkStyleguide);
