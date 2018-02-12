import React from 'react';
import classnames from 'classnames';
import onClickOutside from 'react-onclickoutside';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import Menu from './menu/Menu';
import MenuHeader from './menu/MenuHeader';

const propTypes = {
  title: React.PropTypes.string,
  className: React.PropTypes.string,
  position: React.PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  removeable: React.PropTypes.bool,
  submitButtonLabel: React.PropTypes.string,
  closeButtonLabel: React.PropTypes.string,
  onSubmit: React.PropTypes.func,
  onClose: React.PropTypes.func,
  onRemove: React.PropTypes.func,
  children: React.PropTypes.any,
};

const defaultProps = {
  title: '',
  className: '',
  position: null,
  removeable: false,
  submitButtonLabel: '',
  closeButtonLabel: '',
  onSubmit: null,
  onClose: null,
  onRemove: null,
  children: null,
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
    let closeAction;
    let submitAction;
    let jsx = null;

    if (this.props.onClose) {
      const closeText = this.props.closeButtonLabel || 'Close';

      closeAction = (
        <Button label={ closeText } onClick={ this.props.onClose } secondary />
      );
    }

    if (this.props.onSubmit) {
      const submitText = this.props.submitButtonLabel || 'Submit';

      submitAction = (
        <Button label={ submitText } onClick={ this.props.onSubmit } />
      );
    }

    if (closeAction && submitAction) {
      jsx = (
        <div className="rc-slidein-actions">
          <ButtonGroup>
            { closeAction }
            { submitAction }
          </ButtonGroup>
        </div>
      );
    }

    return jsx;
  }

  renderHeader() {
    let onClose;
    let jsx;

    if (this.props.title) {
      if (this.props.removeable && this.props.onRemove) {
        onClose = this.props.onRemove;
      }

      jsx = (
        <MenuHeader
          title={ this.props.title }
          onClose={ onClose }
        />
      );
    }

    return jsx;
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
SlideIn.defaultProps = defaultProps;

export default onClickOutside(SlideIn);
