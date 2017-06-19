import React from 'react';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import classnames from 'classnames';
import onClickOutside from 'react-onclickoutside';
import Menu from './menu/Menu';
import MenuHeader from './menu/MenuHeader';

const propTypes = {
  title: React.PropTypes.string,
  onSubmit: React.PropTypes.func,
  onClose: React.PropTypes.func,
  onRemove: React.PropTypes.func,
  className: React.PropTypes.string,
  position: React.PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  removeable: React.PropTypes.bool,
  submitButtonLabel: React.PropTypes.string,
  closeButtonLabel: React.PropTypes.string,
};

/**
 * `SlideIn` is a fixed panel that can be positioned to any side of the screen.
 *
 * @example ../../../docs/SlideIn.md
 */

class SlideIn extends React.Component {
  handleClickOutside() {
    if (this.props.onRemove) {
      this.props.onRemove();
    }
  }

  renderContent() {
    return this.props.children;
  }

  renderActions() {
    let closeAction, submitAction;

    if (this.props.onClose) {
      let closeText = this.props.closeButtonLabel || "Close";

      closeAction = (
        <Button label={closeText} onClick={this.props.onClose} secondary />
      );
    }

    if (this.props.onSubmit) {
      let submitText = this.props.submitButtonLabel || "Submit";

      submitAction = (
        <Button label={submitText} onClick={this.props.onSubmit} />
      );
    }

    if (!closeAction && !submitAction) {
      return;
    }

    return (
      <div className="rc-slidein-actions">
        <ButtonGroup>
          { closeAction }
          { submitAction }
        </ButtonGroup>
      </div>
    );
  }

  renderHeader() {
    let onClose;

    if (this.props.removeable && this.props.onRemove) {
      onClose = this.props.onRemove;
    }

    return (
      <MenuHeader
        title={ this.props.title }
        onClose={ onClose }
      />
    );
  }

  render() {
    const { position, className: classProp } = this.props;
    const actions = this.renderActions();
    const header = this.renderHeader();
    const content = this.renderContent();

    const className = classnames('rc-slidein', {
      [`rc-slidein-${position}`]: position,
      'rc-slidein-has-actions': actions,
    }, classProp);

    return (
      <div className={ className }>
        <Menu>
          { header }
          <div className="rc-slidein-content">
            { content }
          </div>
          { actions }
        </Menu>
      </div>
    );
  }
}

SlideIn.propTypes = propTypes;

export default onClickOutside(SlideIn);
