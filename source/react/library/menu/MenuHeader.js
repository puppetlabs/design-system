import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../icon/Icon';

const propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
};

const defaultProps = {
  title: '',
  onClose: null,
};

class MenuHeader extends React.Component {
  renderTitle() {
    const { title } = this.props;
    let jsx;

    if (title) {
      return <div className="rc-menu-title">{title}</div>;
    }

    return jsx;
  }

  renderClose() {
    const { onClose } = this.props;
    let jsx;

    // TODO: This should render a button element or an anchor if its for navigation
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/anchor-is-valid */
    if (onClose) {
      jsx = (
        <a
          role="button"
          tabIndex={0}
          className="rc-menu-close"
          onClick={onClose}
        >
          <Icon type="close" size="tiny" />
        </a>
      );
    }
    /* eslint-enable */

    return jsx;
  }

  render() {
    const title = this.renderTitle();
    const close = this.renderClose();

    return (
      <div className="rc-menu-header">
        {title}
        {close}
      </div>
    );
  }
}

MenuHeader.propTypes = propTypes;
MenuHeader.defaultProps = defaultProps;

export default MenuHeader;
