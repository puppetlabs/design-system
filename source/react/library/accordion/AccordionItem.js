import React from 'react';
import classnames from 'classnames';

import Icon from '../Icon';

const propTypes = {
  key: React.PropTypes.string.isRequired,
  children: React.PropTypes.any,
  title: React.PropTypes.string,
  active: React.PropTypes.bool,
  className: React.PropTypes.string,
  onOpen: React.PropTypes.func,
};

class AccordionItem extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (e.nativeEvent) {
      const nativeEvent = e.nativeEvent;
      nativeEvent.preventDefault();
    }

    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }

  renderContent() {
    return (
      <div className="rc-accordion-item-content">
        { this.props.children }
      </div>
    );
  }

  renderTitle() {
    const className = classnames('rc-accordion-item-title', {
      'rc-accordion-item-title-active': this.props.active,
    });

    const icon = <Icon width="15px" height="15px" type={ this.props.active ? 'minus' : 'plus' } />;

    return (
      <div className={ className }>
        <a href="" onClick={ this.onClick }>
          <span className="rc-accordion-item-title-text">
            { this.props.title }
          </span>

          <span className="rc-accordion-item-title-icon">
            {icon}
          </span>
        </a>
      </div>
    );
  }

  render() {
    const className = classnames('rc-accordion-item', {
      'rc-accordion-item-active': this.props.active,
    }, this.props.className);
    const title = this.renderTitle();
    const content = this.renderContent();

    return (
      <div className={ className }>
        { title }
        { content }
      </div>
    );
  }
}

AccordionItem.propTypes = propTypes;

export default AccordionItem;
