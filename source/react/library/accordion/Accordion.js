import React, { Children } from 'react';
import classnames from 'classnames';

const propTypes = {
  /** Whether to open the first item by default */
  autoOpen: React.PropTypes.bool,
  /** Called with the `key` of the opened `AccordionItem` */
  onChange: React.PropTypes.func,
  /** `AccordionItem`s to render */
  children: React.PropTypes.any,
  /** Class name to apply to the `Accordion` container wrapper div */
  className: React.PropTypes.string,
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
  }

  onOpen(key) {
    return () => {
      this.setState({ activeKey: key });

      if (this.props.onChange) {
        this.props.onChange(key);
      }
    };
  }

  getKey(child, idx) {
    return child.key || String(idx);
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
        onOpen: this.onOpen(key).bind(this),
      };

      newChildren.push(React.cloneElement(child, props));
    });

    return newChildren;
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

export default Accordion;
