import React from 'react';
import Icon from '../Icon';

const propTypes = {
  title: React.PropTypes.string,
  onClose: React.PropTypes.func,
};

const defaultProps = {
  title: '',
  onClose: null,
};

class MenuHeader extends React.Component {
  renderTitle() {
    let jsx;

    if (this.props.title) {
      return (
        <div className="rc-menu-title">{ this.props.title }</div>
      );
    }

    return jsx;
  }

  renderClose() {
    let jsx;

    if (this.props.onClose) {
      jsx = (
        <a
          role="button"
          tabIndex={ 0 }
          className="rc-menu-close"
          onClick={ this.props.onClose }
        >
          <Icon type="close" width="8px" height="8px" />
        </a>
      );
    }

    return jsx;
  }

  render() {
    const title = this.renderTitle();
    const close = this.renderClose();

    return (
      <div className="rc-menu-header">
        { title }
        { close }
      </div>
    );
  }
}

MenuHeader.propTypes = propTypes;
MenuHeader.defaultProps = defaultProps;

export default MenuHeader;
