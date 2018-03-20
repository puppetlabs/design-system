import React from 'react';
import Icon from '../icon/Icon';

const propTypes = {
  /** Visual aide for the user */
  icon: React.PropTypes.string,
  image: React.PropTypes.string,
  alt: React.PropTypes.string,
  /** Textual aide for the user */
  message: React.PropTypes.any,
};

const defaultProps = {
  icon: null,
  image: null,
  alt: null,
  message: '',
};

/**
 * `BlankSlate` is used in list views to signify that no objects have been created yet.
 */

const BlankSlate = (props) => {
  let icon;

  if (props.icon) {
    icon = (
      <div className="rc-blank-slate-icon">
        <Icon height="50px" width="40px" type={ props.icon } />
      </div>
    );
  } else if (props.image) {
    icon = (
      <div className="rc-blank-slate-image">
        <img src={ props.image } alt={ props.alt } />
      </div>
    );
  }

  return (
    <div className="rc-blank-slate">
      { icon }
      <div className="rc-blank-slate-message">
        { props.message }
      </div>
    </div>
  );
};

BlankSlate.propTypes = propTypes;
BlankSlate.defaultProps = defaultProps;

export default BlankSlate;
