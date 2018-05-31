import { bool, string } from 'prop-types';
import React from 'react';

import Button from '.';
import styles from './styleguide.css';
import { withControls } from '../../../styleguide/client/higherOrderComponents';
import { boolean, select, text } from '../../../styleguide/client/knobs';
import typography from '../../styles/typography.css';

const typeOptions = [
  { text: 'Primary', value: 'primary' },
  { text: 'Secondary', value: 'secondary' },
  { text: 'Tertiary', value: 'tertiary' },
  { text: 'Link', value: 'link' },
];

const knobs = {
  content: text('Content', 'Action'),
  type: select('Type', typeOptions, 'primary'),
  disabled: boolean('Disabled', false),
};

const ButtonStyleguide = ({ content, type, disabled }) => (
  <div>
    <div className={typography.heading1}>Button</div>
    <p>
      Puppet products use a family of buttons, with each button intended for a
      different purpose.
    </p>
    <Button
      secondary={type === 'secondary'}
      tertiary={type === 'tertiary'}
      link={type === 'link'}
      disabled={disabled}
      className={styles.button}
    >
      {content}
    </Button>
    <div className={typography.heading3}>Primary button</div>
    <p>
      Used for the single most important action on any given page, generally
      defined as the action which moves the user forward in a workflow (e.g.
      next, submit, continue, run, etc.) or resolves a workflow (e.g. delete,
      apply, commit, etc.). A primary action button should be used sparingly: no
      more than 1 primary action per page or instance.
    </p>
    <div className={typography.heading3}>Secondary button</div>
    <p>
      The most commonly used button. Generally used in isolation, not paired
      with other buttons or actions. It showcases actions that a user might take
      on any given page which are not the single most important action; this
      might include micro-workflows such as applying a filter, confirming a
      change, etc.
    </p>
    <div className={typography.heading3}>Tertiary button</div>
    <p>
      Most commonly used in support of more critical buttons, the tertiary
      action button is the user&apos;s safety component. When the primary action
      button says &quot;Save,&quot; the tertiary action button says
      &quot;Discard&quot;; when the primary action button says
      &quot;Continue,&quot; the tertiary action button says &quot;Go back&quot;.
      Used any time we need to provide a user with the ability abandon or revoke
      a decision.
    </p>
    <div className={typography.heading3}>Link-styled button</div>
    <p>Lorem ipsum dolor sit amet hierarchy.</p>
  </div>
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

export default withControls({ knobs })(ButtonStyleguide);
