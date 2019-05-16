import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { focus } from '../../helpers/statics';

import Button from '../buttons/Button';

const propTypes = {
  /** Visible tab label  */
  title: PropTypes.string,
  /** For ease of reference in controlled-mode, a custom unique id can be provided. By default the tab index will be used  */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Internally managed tabs ID  */
  tabsId: PropTypes.string,
  /** Internally managed active state  */
  active: PropTypes.bool,
  /** Internally managed focus state  */
  focused: PropTypes.bool,
  /** Internally managed onClick for Tab button. Callback to parent */
  onKeyDown: PropTypes.func,
  /** Internally managed onClick for Tab button. Callback to parent */
  onClick: PropTypes.func,
};

const defaultProps = {
  title: '',
  id: null,
  tabsId: null,
  active: false,
  focused: false,
  onKeyDown() {},
  onClick() {},
};

class Tab extends React.Component {
  componentWillUpdate(props) {
    const { focused } = props;

    if (focused) {
      focus(this.tab);
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
