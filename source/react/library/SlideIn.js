import React from 'react';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import classnames from 'classnames';

const propTypes = {
  onSubmit: React.PropTypes.func,
  onClose: React.PropTypes.func,
  className: React.PropTypes.string,
  position: React.PropTypes.string,
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

  render() {
    let actions = this.renderActions();

    const className = classnames('rc-slidein', {
      'rc-slidein-bottom': this.props.position == 'bottom',
      'rc-slidein-top': this.props.position == 'top',
      'rc-slidein-left': this.props.position == 'left',
      'rc-slidein-right': this.props.position == 'right',
      'rc-slidein-has-actions': actions,
    }, this.props.className);

    return (
      <div className={className}>
        <div className="rc-slidein-content">
          {this.renderContent()}
        </div>
        {actions}
      </div>
    );
  }
}

SlideIn.propTypes = propTypes;

export default SlideIn;
