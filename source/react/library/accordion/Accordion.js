import React, { Children } from 'react';
import classnames from 'classnames';

import Icon from '../Icon';

const propTypes = {
  /** Title for the Accordion */
  title: React.PropTypes.string,
  /** Function called when Accordion is closed. */
  onClose: React.PropTypes.func,
  /** Whether to open the first item by default */
  autoOpen: React.PropTypes.bool,
  /** Called with the `key` of the opened `AccordionItem` */
  onChange: React.PropTypes.func,
  /** `AccordionItem`s to render */
  children: React.PropTypes.any,
  /** Class name to apply to the `Accordion` container wrapper div */
  className: React.PropTypes.string,
};

const defaultProps = {
  onClose: () => {},
  onChange: () => {},
};

/**
 * `Accordion` renders multiple `AccordionItem`s, keeping track of which one is
 * open.
 *
 * @example ../../../../docs/Accordion.md
 */
class Accordion extends React.Component {
  constructor(props) {
    super(props);

    // We may need to account for the header
    const activeIndex = (typeof props.title === 'undefined' ? 0 : 1);

    this.state = {
      activeIdx: props.autoOpen ? activeIndex : null,
    };

    this.onClose = this.onClose.bind(this);
    this.onOpenChild = this.onOpenChild.bind(this);
  }

  onClose(e) {
    if (e) {
      e.preventDefault();
    }

    this.props.onClose();
  }

  onOpenChild(key) {
    return () => {
      this.setState({ activeIdx: key });

      this.props.onChange(key);
    };
  }

  getKey(child, idx) {
    return child.key || String(idx);
  }

  hasActive() {
    return typeof this.state.activeIdx !== 'undefined' && this.state.activeIdx !== null;
  }

  renderHeader() {
    return (
      <div className="rc-accordion-header" key="header">
        <span className="rc-accordion-header-title">{ this.props.title }</span>
        <span className="rc-accordion-header-icon">
          <a href="" onClick={ this.onClose } >
            <Icon width="8px" height="8px" type="close" />
          </a>
        </span>
      </div>
    );
  }

  renderChild(child, index) {
    const activeIdx = this.state.activeIdx;

    // We require a key, but in case the user supplies something all wrong we
    // can use the index as a surrogate.
    const key = this.getKey(child, index);

    // This element is "active" if the current key is indeed active.
    const active = activeIdx === index;

    const props = {
      key,
      active,
      onOpen: this.onOpenChild(index),
    };

    return React.cloneElement(child, props);
  }

  renderItems() {
    let children = Children.toArray(this.props.children);

    if (typeof this.props.title !== 'undefined') {
      children.unshift(this.renderHeader());
    }

    children = children.map((c, i) => this.renderChild(c, i));

    return <div className="rc-accordion-items">{ children }</div>;
  }

  render() {
    const className = classnames('rc-accordion', this.props.className);
    const items = this.renderItems();

    return (
      <div className={ className }>
        { items }
      </div>
    );
  }
}

Accordion.propTypes = propTypes;
Accordion.defaultProps = defaultProps;

export default Accordion;
