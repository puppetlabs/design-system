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

    this.state = { activeKey: null };

    this.onClose = this.onClose.bind(this);
    this.onOpenChild = this.onOpenChild.bind(this);
    this.onCloseChild = this.onCloseChild.bind(this);
  }

  onClose(e) {
    if (e) {
      e.preventDefault();
    }

    this.props.onClose();
  }

  onOpenChild(key) {
    return () => {
      this.setState({ activeKey: key });

      this.props.onChange(key);
    };
  }

  onCloseChild(key) {
    return () => {
      this.setState({ activeKey: null })

      this.props.onChange(key);
    };
  }

  getKey(child, idx) {
    return child.key || String(idx);
  }

  renderHeader() {
    const { title, onClose } = this.props;
    let jsx;

    if (typeof title !== 'undefined') {
      jsx = (
        <div className="rc-accordion-header">
          <span className="rc-accordion-header-title">{ title }</span>
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

  renderItems() {
    const activeKey = this.state.activeKey;
    const newChildren = [];

    Children.forEach(this.props.children, (child, index) => {
      if (!child) return;

      // We require a key, but in case the user supplies something all wrong we
      // can use the index as a surrogate.
      const key = this.getKey(child, index);
      const title = child.props.title;

      // This element is "active" if the current key is indeed active.
      let active = activeKey === key;

      if (this.props.autoOpen && !activeKey && index === 0) {
        active = true;
      }

      const props = {
        key,
        title,
        active,
        children: child.props.children,
        onOpen: this.onOpenChild(key),
        onClose: this.onCloseChild(key),
      };

      newChildren.push(React.cloneElement(child, props));
    });

    return newChildren;
  }

  render() {
    const className = classnames('rc-accordion', this.props.className);
    const header = this.renderHeader();
    const items = this.renderItems();

    return (
      <div className={ className }>
        { header }
        { items }
      </div>
    );
  }
}

Accordion.propTypes = propTypes;
Accordion.defaultProps = defaultProps;

export default Accordion;
