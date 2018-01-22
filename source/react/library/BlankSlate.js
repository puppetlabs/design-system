import React from 'react';
import Icon from './icon/Icon';

const propTypes = {
  /** Visual aide for the user */
  icon: React.PropTypes.string,
  /** Textual aide for the user */
  message: React.PropTypes.any,
};

const defaultProps = {
  icon: null,
  message: '',
};

/**
 * `BlankSlate` is used to signify that no objects have been created yet.
 *
 * @example ../../../docs/BlankSlate.md
 */

const BlankSlate = props => (
  <div className="rc-blank-slate">
    <div className="rc-blank-slate-icon">
      <Icon height="50px" width="40px" type={ props.icon } />
    </div>
    <div className="rc-blank-slate-message">
      { props.message }
    </div>
  </div>
);

BlankSlate.propTypes = propTypes;
BlankSlate.defaultProps = defaultProps;

export default BlankSlate;
