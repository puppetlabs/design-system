import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '../buttons/Button';

const propTypes = {
  /** Visible tab label  */
  title: PropTypes.string,
  /** For accesibility and state management, a unique ID is required  */
  id: PropTypes.string.isRequired,
  /** Internally managed tabs ID  */
  tabsId: PropTypes.string,
  /** Internally managed active state  */
  active: PropTypes.bool,
  /** Internally managed focus state  */
  focussed: PropTypes.bool,
  /** Internally managed onClick for Tab button. Callback to parent */
  onKeyDown: PropTypes.func,
  /** Internally managed onClick for Tab button. Callback to parent */
  onClick: PropTypes.func,
};

const defaultProps = {
  title: '',
  tabsId: null,
  active: false,
  focussed: false,
  onKeyDown() {},
  onClick() {},
};

class Tab extends React.Component {
  componentWillUpdate(props) {
    const { focussed } = props;

    if (focussed) {
      this.tab.focus();
    }
  }

  render() {
    const { title, active, onKeyDown, onClick, id, tabsId } = this.props;

    const buttonProps = {
      role: 'tab',
      'aria-selected': !!active,
      'aria-controls': `${tabsId}-panel-${id}`,
      id: `${tabsId}-tab-${id}`,
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
