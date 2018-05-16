import { bool, string } from 'prop-types';
import React from 'react';

import Button from '.';
import styles from './styleguide.css';
import { withStyleguide } from '../../../styleguide/client/higherOrderComponents';
import { boolean, select, text } from '../../../styleguide/client/knobs';

const typeOptions = [
  { text: 'Primary', value: 'primary' },
  { text: 'Secondary', value: 'secondary' },
  { text: 'Tertiary', value: 'tertiary' },
];

const knobs = {
  content: text('Content', 'Action'),
  type: select('Type', typeOptions, 'primary'),
  disabled: boolean('Disabled', false),
};

const ButtonStyleguide = ({ content, type, disabled }) => (
  <Button
    secondary={type === 'secondary'}
    tertiary={type === 'tertiary'}
    disabled={disabled}
    className={styles.button}
  >
    {content}
  </Button>
);

ButtonStyleguide.propTypes = {
  content: string,
  disabled: bool,
  type: string,
};

ButtonStyleguide.defaultProps = {
  content: '',
  disabled: false,
  type: 'primary',
};

export default withStyleguide({ knobs })(ButtonStyleguide);
