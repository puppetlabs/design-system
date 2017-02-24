import React from 'react';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import classnames from 'classnames';
import onClickOutside from 'react-onclickoutside';

const propTypes = {
  title: React.PropTypes.string,
  onSubmit: React.PropTypes.func,
  onClose: React.PropTypes.func,
  onRemove: React.PropTypes.func,
  className: React.PropTypes.string,
  position: React.PropTypes.string,
  removeable: React.PropTypes.bool,
  submitButtonLabel: React.PropTypes.string,
  closeButtonLabel: React.PropTypes.string,
};

class SlideIn extends React.Component {
  constructor(props) {
    super(props);
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
          {closeAction}
          {submitAction}
        </ButtonGroup>
      </div>
    );
  }

  renderRemove() {
    // if they don't have "removeable" enabled at all then...
    if (!this.props.removeable) return;

    let removeButton;

    if (this.props.onRemove) {
      removeButton = (
        <div className="rc-slidein-remove">
          <Button icon="close" transparent size="tiny" onClick={this.props.onRemove} />
        </div>
      );
    }

    return removeButton;
  }

  renderTitle() {
    if (!this.props.title) return;

    return (
      <div className="rc-slidein-title">
        <h2>{this.props.title}</h2>
      </div>
    );
  }

  render() {
    let actions = this.renderActions();
    let remove = this.renderRemove();

    const className = classnames('rc-slidein', {
      'rc-slidein-bottom': this.props.position == 'bottom',
      'rc-slidein-top': this.props.position == 'top',
      'rc-slidein-left': this.props.position == 'left',
      'rc-slidein-right': this.props.position == 'right',
      'rc-slidein-has-actions': actions,
    }, this.props.className);

    const title = this.renderTitle();

    let header;
    
    if (title || remove) {
      header = (
        <div className="rc-slidein-header">
          {title}
          {remove}
        </div>
      );
    }

    return (
      <div className={className}>
        {header}
        <div className="rc-slidein-content">
          {this.renderContent()}
        </div>
        {actions}
      </div>
    );
  }

  handleClickOutside() {
    if (this.props.onRemove) {
      this.props.onRemove();
    }
  }
}

SlideIn.propTypes = propTypes;

export default onClickOutside(SlideIn);
