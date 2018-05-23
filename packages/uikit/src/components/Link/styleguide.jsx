import { bool, string } from 'prop-types';
import React from 'react';

import Link from '.';
import { withControls } from '../../../styleguide/client/higherOrderComponents';
import { boolean, select, text } from '../../../styleguide/client/knobs';
import typography from '../../styles/typography.css';

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

const LinkStyleguide = ({ content, to, type, button, disabled }) => (
  <div>
    <div className={typography.heading1}>Link</div>
    <p>Links are used to take the user from one page to another.</p>
    <Link
      to={to}
      button={button}
      secondary={type === 'secondary'}
      disabled={disabled}
    >
      {content}
    </Link>
    <div className={typography.heading3}>Style and usage</div>
    <p>
      Text links may be applied to body content elements and body-small content
      elements, but generally are not applied to titles or headings. The
      application of a link does not change the underlying type style, except by
      the addition of color and an underline. (Links should not change an
      item&apos;s type weight from &apos;regular&apos; to &apos;bold&apos;, for
      example.)
    </p>
  </div>
);

LinkStyleguide.propTypes = {
  content: string,
  to: string,
  type: string,
  button: bool,
  disabled: bool,
};

LinkStyleguide.defaultProps = {
  content: '',
  to: '',
  type: '',
  button: false,
  disabled: false,
};

export default withControls({ knobs })(LinkStyleguide);
