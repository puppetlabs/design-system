import React, { Children } from 'react';
import classnames from 'classnames';

import Icon from '../icon/Icon';

const getKey = function (child = {}, idx) {
  return child.key || String(idx);
};

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
  /** Icon to render next to the title in the header */
  icon: React.PropTypes.string,
};

const defaultProps = {
  title: '',
  className: '',
  autoOpen: false,
  onClose: null,
  onChange: null,
  children: null,
};

/**
 * `Accordion` is designed to be a container for forms and menus. It renders multiple
 * `AccordionItem`s, keeping track of which one is open in state.
 */
class Accordion extends React.Component {
  constructor(props) {
    super(props);

    // We may need to account for the header
    const activeIndex = props.title ? 1 : 0;

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

    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  onOpenChild(key) {
    return () => {
      this.setState({ activeIdx: key });

      if (this.props.onChange) {
        this.props.onChange(key);
      }
    };
  }

  hasActive() {
    return typeof this.state.activeIdx !== 'undefined' && this.state.activeIdx !== null;
  }

  renderHeader() {
    let icon;

    if (this.props.icon) {
      icon = (
        <span className="rc-accordion-header-icon">
          <Icon width="16px" height="16px" type={ this.props.icon } />
        </span>
      );
    }

    return (
      <div className="rc-accordion-header" key="header">
        { icon }
        <span className="rc-accordion-header-title">{ this.props.title }</span>
        <span className="rc-accordion-header-action">
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
    const key = getKey(child, index);

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

    if (this.props.title) {
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
