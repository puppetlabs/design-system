import React from 'react';
import Icon from './Icon';

const propTypes = {
  icon: React.PropTypes.string,
  message: React.PropTypes.any,
};

const BlankSlate = props => (
  <div className="rc-blank-slate">
    <div className="rc-blank-slate-icon">
      <Icon height="50" width="40" type={ props.icon } />
    </div>
    <div className="rc-blank-slate-message">
      { props.message }
    </div>
  </div>
);

BlankSlate.propTypes = propTypes;

export default BlankSlate;
