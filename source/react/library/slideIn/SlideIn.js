import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import onClickOutside from 'react-onclickoutside';
import Button from '../buttons/Button';
import ButtonGroup from '../buttons/ButtonGroup';
import Menu from '../menu/Menu';
import MenuHeader from '../menu/MenuHeader';

const propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  removeable: PropTypes.bool,
  submitButtonLabel: PropTypes.string,
  closeButtonLabel: PropTypes.string,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  onRemove: PropTypes.func,
  children: PropTypes.node,
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
 */

class SlideIn extends React.Component {
  handleClickOutside() {
    const { onRemove } = this.props;

    if (onRemove) {
      onRemove();
    }
  }

  renderContent() {
    const { children } = this.props;

    return children;
  }

  renderActions() {
    const {
      onClose,
      closeButtonLabel,
      onSubmit,
      submitButtonLabel,
    } = this.props;
    let closeAction;
    let submitAction;
    let jsx = null;

    if (onClose) {
      const closeText = closeButtonLabel || 'Close';

      closeAction = <Button label={closeText} onClick={onClose} secondary />;
    }

    if (onSubmit) {
      const submitText = submitButtonLabel || 'Submit';

      submitAction = <Button label={submitText} onClick={onSubmit} />;
    }

    if (closeAction && submitAction) {
      jsx = (
        <div className="rc-slidein-actions">
          <ButtonGroup>
            {closeAction}
            {submitAction}
          </ButtonGroup>
        </div>
      );
    }

    return jsx;
  }

  renderHeader() {
    const { title, removeable, onRemove } = this.props;
    let onClose;
    let jsx;

    if (title) {
      if (removeable && onRemove) {
        onClose = onRemove;
      }

      jsx = <MenuHeader title={title} onClose={onClose} />;
    }

    return jsx;
  }

  render() {
    const { position, className: classProp } = this.props;
    const actions = this.renderActions();
    const header = this.renderHeader();
    const content = this.renderContent();

    const className = classnames(
      'rc-slidein',
      {
        [`rc-slidein-${position}`]: position,
        'rc-slidein-has-actions': actions,
      },
      classProp,
    );

    return (
      <div className={className}>
        <Menu>
          {header}
          <div className="rc-slidein-content">{content}</div>
          {actions}
        </Menu>
      </div>
    );
  }
}

SlideIn.propTypes = propTypes;
SlideIn.defaultProps = defaultProps;

export default onClickOutside(SlideIn);
