import React from 'react';
import classnames from 'classnames';

import FormField from './FormField';

const propTypes = {
  className: React.PropTypes.string,
  inline: React.PropTypes.bool,
  children: React.PropTypes.any,
};

const defaultProps = {
  className: '',
};

/**
 * `Form` is a container component for rendering forms.
 */
const Form = (props) => {
  const className = classnames('rc-form', props.className, {
    'rc-form-inline': props.inline,
  });

  return (
    <div className={ className }>
      { props.children }
    </div>
  );
};

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;


Form.Field = FormField;

export default Form;
