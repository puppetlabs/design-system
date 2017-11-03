import React from 'react';
import classnames from 'classnames';

import Icon from '../Icon';

const propTypes = {
  children: React.PropTypes.any,
  /** A string to identify the item visually for the user */
  title: React.PropTypes.string,
  /**
    Whether or not the children are displayed. Usually controlled by the parent
    `Accordion`
  */
  active: React.PropTypes.bool,
  /** Class name to apply to container */
  className: React.PropTypes.string,
  /** Callback for when the user opens the item */
  onOpen: React.PropTypes.func,
  /** Callback for when the user closes the item */
  onClose: React.PropTypes.func,
};

const defaultProps = {
  onOpen: () => {},
  onClose: () => {},
};

/**
 * `AccordionItem`s are containers which are meant to be rendered within an
 * `Accordion`.
 *
 * @example ../../../../docs/AccordionItem.md
 */
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

    this.props.active ? this.props.onClose() : this.props.onOpen();
  }

  renderContent() {
    return (
      <div className="rc-accordion-item-content">
        { this.props.children }
      </div>
    );
  }

  renderTitle() {
    const { active, title } = this.props;
    const className = classnames('rc-accordion-item-title', {
      'rc-accordion-item-title-active': active,
    });
    const icon = (active ? 'minus' : 'plus');

    const titleContent = (
      <span className="rc-accordion-item-title-text">
        { title }
      </span>
    );

    const iconContent = (
      <span className="rc-accordion-item-title-icon">
        <Icon width="10px" height="10px" type={ icon } />
      </span>
    );

    return (
      <div className={ className }>
        <a className="rc-accordion-item-header" href="" onClick={ this.onClick }>
          { titleContent }
          { iconContent }
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
AccordionItem.defaultProps = defaultProps;

export default AccordionItem;
