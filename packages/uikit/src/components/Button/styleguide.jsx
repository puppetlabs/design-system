import { func, string } from 'prop-types';
import { compose, path } from 'ramda';
import React from 'react';

import Button from '.';
import styles from './styleguide.css';
import { withStyleguide } from '../../../styleguide/client/higherOrderComponents';
import { text } from '../../../styleguide/client/knobs';

const knobs = {
  content: text('Content', 'Action'),
};

const ButtonStyleguide = ({ content }) => (
  <div>
    <Button className={styles.button}>{content}</Button>
    <Button disabled className={styles.button}>
      {content}
    </Button>
    <Button secondary className={styles.button}>
      {content}
    </Button>
    <Button secondary disabled className={styles.button}>
      {content}
    </Button>
    <Button tertiary className={styles.button}>
      {content}
    </Button>
    <Button tertiary disabled className={styles.button}>
      {content}
    </Button>
  </div>
);

ButtonStyleguide.propTypes = {
  content: string,
};

ButtonStyleguide.defaultProps = {
  content: '',
};

export default withStyleguide({ knobs })(ButtonStyleguide);
