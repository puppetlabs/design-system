import React from 'react';
import classnames from 'classnames';

const propTypes = {
  key:       React.PropTypes.string.isRequired,
  children:  React.PropTypes.any,
  title:     React.PropTypes.string,
  active:    React.PropTypes.bool,
  className: React.PropTypes.string,
};

class AccordionItem extends React.Component {
  constructor(props) {
    super(props);
  }

  renderContent() {
    return (
      <div className="rc-accordion-item-content">
        {this.props.children}
      </div>
    );
  }

  onClick(e) {
    if (e.nativeEvent) {
      let nativeEvent = e.nativeEvent;
      nativeEvent.preventDefault();
    }

    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }

  renderTitle() {
    var className = classnames("rc-accordion-item-title", {
      'rc-accordion-item-title-active': this.props.active
    });

    return (
      <div className={className}>
        <a href="" onClick={this.onClick.bind(this)}>{this.props.title}</a>
      </div>
    );
  }

  render() {
    var className = classnames("rc-accordion-item", {
      'rc-accordion-item-active': this.props.active
    }, this.props.className);

    return (
      <div className={className}>
        {this.renderTitle()}
        {this.renderContent()}
      </div>
    );
  }
}

export default AccordionItem
