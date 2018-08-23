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
  message: PropTypes.node,
  title: PropTypes.node,
  lead: PropTypes.node,
  content: PropTypes.node,
  note: PropTypes.node,
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

const BlankSlate = ({
  onClick,
  icon,
  image,
  alt,
  message,
  title,
  lead,
  content,
  note,
}) => {
  let visual;
  let body;
  let button;

  if (onClick) {
    button = (
      <Button
        label="Enable stats"
        onClick={() => {
          onClick();
        }}
      />
    );
  }

  // Icon prop is dated
  if (icon) {
    visual = (
      <div className="rc-blank-slate-icon">
        <Icon height="50px" width="40px" type={icon} />
      </div>
    );
  } else if (image) {
    visual = (
      <div className="rc-blank-slate-image">
        <img src={image} alt={alt} />
      </div>
    );
  }

  // Message prop is dated
  if (message) {
    body = <div className="rc-blank-slate-message">{message}</div>;
  } else {
    body = (
      <div className="rc-blank-slate-message">
        <div className="rc-blank-slate-body">
          <h1 className="rc-blank-slate-title">{title}</h1>
          <p className="rc-blank-slate-lead">{lead}</p>
          <p className="rc-blank-slate-content">{content}</p>
        </div>
        <p className="rc-blank-slate-note">{note}</p>
      </div>
    );
  }

  return (
    <div className="rc-blank-slate">
      {visual}
      {body}
      {button}
    </div>
  );
};

BlankSlate.propTypes = propTypes;
BlankSlate.defaultProps = defaultProps;

export default BlankSlate;
