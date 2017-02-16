import React, { Children } from 'react';
import classnames from 'classnames';

const propTypes = {
  onChange:  React.PropTypes.func,
  children:  React.PropTypes.any,
  className: React.PropTypes.string,
};

class Accordion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeKey: null
    };
  }

  getKey(child, idx) {
    return child.key || String(idx);
  }

  onOpen(key) {
    return () => {
      this.setState({ activeKey: key });

      if (this.props.onChange) {
	this.props.onChange(key);
      }
    };
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
    var className = classnames("rc-accordion", this.props.className);

    return (
      <div className={className}>
        {this.renderItems()}
      </div>
    );
  }
}

Accordion.propTypes = propTypes;

export default Accordion
