import React from 'react';
import Button from '../Button';

const propTypes = {
  title: React.PropTypes.string,
  onClose: React.PropTypes.func,
};

class MenuHeader extends React.Component {
  renderTitle() {
    let jsx;

    if (this.props.title) {
      return (
        <div className="rc-menu-title">
          <h2>{ this.props.title }</h2>
        </div>
      );
    }

    return jsx;
  }

  renderClose() {
    let jsx;

    if (this.props.onClose) {
      jsx = (
        <div className="rc-menu-close">
          <Button
            transparent
            icon="close"
            size="tiny"
            onClick={ this.props.onClose }
          />
        </div>
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

export default MenuHeader;
