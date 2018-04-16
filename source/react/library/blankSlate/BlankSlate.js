import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../icon/Icon';
import Button from '../buttons/Button';

const propTypes = {
  /** Visual aide for the user */
  icon: PropTypes.string,
  image: PropTypes.string,
  alt: PropTypes.string,
  /** Textual aide for the user */
  message: PropTypes.any,
  title: PropTypes.any,
  lead: PropTypes.any,
  content: PropTypes.any,
  note: PropTypes.any,
  onClick: PropTypes.func,
};

const defaultProps = {
  icon: null,
  image: '',
  alt: '',
  message: null,
  title: '',
  lead: '',
  content: '',
  note: '',
  onClick: null,
};

/**
 * `BlankSlate` is used in list views to signify that no objects have been created yet.
 */

const BlankSlate = (props) => {
  let visual;
  let body;
  let button;

  if (props.onClick) {
    const onClick = () => {
      props.onClick();
    };

    button = (
      <Button
        label="Enable stats"
        onClick={ onClick }
      />
    );
  }

  // Icon prop is dated
  if (props.icon) {
    visual = (
      <div className="rc-blank-slate-icon">
        <Icon height="50px" width="40px" type={ props.icon } />
      </div>
    );
  } else if (props.image) {
    visual = (
      <div className="rc-blank-slate-image">
        <img src={ props.image } alt={ props.alt } />
      </div>
    );
  }

  // Message prop is dated
  if (props.message) {
    body = (
      <div className="rc-blank-slate-message">
        { props.message }
      </div>
    );
  } else {
    body = (
      <div className="rc-blank-slate-message">
        <div className="rc-blank-slate-body">
          <h1 className="rc-blank-slate-title">
            { props.title }
          </h1>
          <p className="rc-blank-slate-lead">
            { props.lead }
          </p>
          <p className="rc-blank-slate-content">
            { props.content }
          </p>
        </div>
        <p className="rc-blank-slate-note">
          { props.note }
        </p>
      </div>
    );
  }

  return (
    <div className="rc-blank-slate">
      { visual }
      { body }
      { button }
    </div>
  );
};

BlankSlate.propTypes = propTypes;
BlankSlate.defaultProps = defaultProps;

export default BlankSlate;
