import { bool, string } from 'prop-types';
import React from 'react';

import Button from '.';
import styles from './styleguide.css';
import { withStyleguide } from '../../../styleguide/client/higherOrderComponents';
import { boolean, text } from '../../../styleguide/client/knobs';

const knobs = {
  content: text('Content', 'Action'),
  secondary: boolean('Secondary', false),
  tertiary: boolean('Tertiary', false),
  disabled: boolean('Disabled', false),
};

const ButtonStyleguide = ({ content, secondary, tertiary, disabled }) => (
  <Button
    secondary={secondary}
    tertiary={tertiary}
    disabled={disabled}
    className={styles.button}
  >
    {content}
  </Button>
);

ButtonStyleguide.propTypes = {
  content: string,
  disabled: bool,
  secondary: bool,
  tertiary: bool,
};

ButtonStyleguide.defaultProps = {
  content: '',
  disabled: false,
  secondary: false,
  tertiary: false,
};

export default withStyleguide({ knobs })(ButtonStyleguide);
