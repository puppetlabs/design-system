import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '../buttons/Button';

const propTypes = {
  title: PropTypes.string,
  /** Is the button active?  */
  active: PropTypes.bool,
  /** Is the button focussed?  */
  focussed: PropTypes.bool,
  /** onClick for Tab button. Callback to parent */
  onKeyDown: PropTypes.func,
  /** onClick for Tab button. Callback to parent */
  onClick: PropTypes.func,
  /** Managed internally for events */
  id: PropTypes.number,
};

const defaultProps = {
  title: '',
  active: false,
  focussed: false,
  onKeyDown() {},
  onClick() {},
  id: null,
};

class Tab extends React.Component {
  componentWillUpdate(props) {
    const { focussed } = props;

    if (focussed) {
      this.tab.focus();
    }
  }

  render() {
    const { title, active, onKeyDown, onClick, id } = this.props;

    const buttonProps = {
      role: 'tab',
      'aria-selected': !!active,
      'aria-controls': `${title}-panel`,
      id,
      tabIndex: !active ? -1 : 0,
      onClick: () => onClick(id),
      onKeyDown,
      focus: active ? 1 : 0,
    };

    return (
      <Button
        type="secondary"
        className={classNames('rc-tabs-button', {
          'rc-tabs-button-active': active,
        })}
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
