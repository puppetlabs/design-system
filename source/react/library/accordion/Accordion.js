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

    this.state = {
      activeIdx: null,
    };

    this.onClose = this.onClose.bind(this);
    this.onOpenChild = this.onOpenChild.bind(this);
    this.onCloseChild = this.onCloseChild.bind(this);
  }

  componentDidMount() {
    const wrapper = this.wrapper.getBoundingClientRect();
    const content = this.content.getBoundingClientRect();

    const activeHeight = wrapper.height - content.height;

    const newState = { activeHeight };

    if (this.props.autoOpen) {
      newState.activeIdx = 0;
    }

    this.setState(newState);
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

  onCloseChild(key) {
    return () => {
      this.setState({ activeIdx: null });

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
    let jsx;

    if (typeof title !== 'undefined') {
      jsx = (
        <div className="rc-accordion-header">
          <span className="rc-accordion-header-title">{ this.props.title }</span>
          <span className="rc-accordion-header-icon">
            <a href="" onClick={ this.onClose } >
              <Icon width="8px" height="8px" type="close" />
            </a>
          </span>
        </div>
      );
    }

    return jsx;
  }

  renderChild(child, index) {
    const activeIdx = this.state.activeIdx;

    // We require a key, but in case the user supplies something all wrong we
    // can use the index as a surrogate.
    const key = this.getKey(child, index);
    const title = child.props.title;

    // This element is "active" if the current key is indeed active.
    const active = activeIdx === index;

    const props = {
      key,
      title,
      active,
      children: child.props.children,
      onOpen: this.onOpenChild(index),
      onClose: this.onCloseChild(index),
    };

    if (active) {
      props.maxHeight = this.state.activeHeight;
    }

    return React.cloneElement(child, props);
  }

  renderFirstGroup(children) {
    const activeIdx = this.state.activeIdx;
    let group = [];

    if (this.hasActive()) {
      // If we have an active item, render all the items before it.
      children.forEach((c, i) => {
        if (i < activeIdx) {
          group.push(this.renderChild(c, i));
        }
      });
    } else {
      // Otherwise, we just render all the children./
      group = children.map((c, i) => this.renderChild(c, i));
    }

    return <div key="first-group" className="first-group">{ group }</div>;
  }

  renderActive(children) {
    const activeIdx = this.state.activeIdx;
    let active;

    if (this.hasActive()) {
      active = this.renderChild(children[activeIdx], activeIdx);
    }

    return <div key="active-group" className="active-group">{ active }</div>;
  }

  renderSecondGroup(children) {
    const activeIdx = this.state.activeIdx;
    const group = [];

    if (this.hasActive()) {
      children.forEach((c, i) => {
        if (i > activeIdx) {
          group.push(this.renderChild(c, i));
        }
      });
    }

    return <div key="second-group" className="second-group">{ group }</div>;
  }

  renderItems() {
    const children = Children.toArray(this.props.children);
    const items = [];

    items.push(this.renderFirstGroup(children));
    items.push(this.renderActive(children));
    items.push(this.renderSecondGroup(children));

    return items;
  }

  render() {
    const className = classnames('rc-accordion', this.props.className);
    const header = this.renderHeader();
    const items = this.renderItems();

    return (
      <div ref={ (c) => { this.wrapper = c; } } className={ className }>
        <div ref={ (c) => { this.content = c; } } >
          { header }
          { items }
        </div>
      </div>
    );
  }
}

Accordion.propTypes = propTypes;
Accordion.defaultProps = defaultProps;

export default Accordion;
