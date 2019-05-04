import React from 'react';
import PropTypes from 'prop-types';

import Button from '../buttons/Button';

const propTypes = {
  title: PropTypes.string,
  active: PropTypes.bool.isRequired,
  /** onClick for Tab button. Callback to parent */
  onKeyUp: PropTypes.func.isRequired,
  /** onClick for Tab button. Callback to parent */
  onClick: PropTypes.func.isRequired,
  /** Managed internally for events */
  id: PropTypes.number.isRequired,
};

const defaultProps = {
  title: '',
};

class Tab extends React.Component {
  componentWillUpdate(props) {
    const { active } = props;

    if (active) {
      this.tab.focus();
    }
  }

  render() {
    const { title, active, onKeyUp, onClick, id } = this.props;

    const buttonProps = {
      role: 'tab',
      'aria-selected': !!active,
      'aria-controls': `${title}-panel`,
      id,
      tabindex: !active ? -1 : 0,
      onClick: () => onClick(id),
      onKeyUp,
      focus: active,
    };

    return (
      <Button
        className="rc-tabs-button"
        id={id}
        ref={button => {
          this.tab = button;
        }}
        {...buttonProps}
      >
        {title}
      </Button>
    );
  }
}

Tab.propTypes = propTypes;
Tab.defaultProps = defaultProps;

export default Tab;
