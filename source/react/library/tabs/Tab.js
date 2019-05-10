import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '../buttons/Button';

const propTypes = {
  title: PropTypes.string,
  /** Is the button selected?  */
  selected: PropTypes.bool.isRequired,
  /** Is the button focussed?  */
  focussed: PropTypes.bool.isRequired,
  /** Is the button disabled?  */
  disabled: PropTypes.bool,
  /** onClick for Tab button. Callback to parent */
  onKeyDown: PropTypes.func.isRequired,
  /** onClick for Tab button. Callback to parent */
  onClick: PropTypes.func.isRequired,
  /** Managed internally for events */
  id: PropTypes.number.isRequired,
};

const defaultProps = {
  title: '',
  disabled: false,
};

class Tab extends React.Component {
  componentWillUpdate(props) {
    const { focussed } = props;

    if (focussed) {
      this.tab.focus();
    }
  }

  render() {
    const { title, selected, disabled, onKeyDown, onClick, id } = this.props;

    const buttonProps = {
      role: 'tab',
      'aria-selected': !!selected,
      'aria-controls': `${title}-panel`,
      id,
      tabindex: !selected ? -1 : 0,
      onClick: () => onClick(id),
      onKeyDown,
      focus: selected,
    };

    return (
      <Button
        type="secondary"
        className={classNames('rc-tabs-button', {
          'rc-tabs-button-selected': selected,
        })}
        id={id}
        ref={button => {
          this.tab = button;
        }}
        disabled={disabled}
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
