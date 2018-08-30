import PropTypes from 'prop-types';
import React, { Children } from 'react';
import classnames from 'classnames';
import Heading from '../heading';

import Icon from '../icon/Icon';
import { getKey } from '../../helpers/statics';

const propTypes = {
  /** Title for the Accordion */
  title: PropTypes.string,
  /** Function called when Accordion is closed. */
  onClose: PropTypes.func,
  /** Whether to open the first item by default */
  autoOpen: PropTypes.bool,
  /** Called with the `key` of the opened `AccordionItem` */
  onChange: PropTypes.func,
  /** `AccordionItem`s to render */
  children: PropTypes.node,
  /** Class name to apply to the `Accordion` container wrapper div */
  className: PropTypes.string,
  /** Icon to render next to the title in the header */
  icon: PropTypes.string,
};

const defaultProps = {
  title: '',
  className: '',
  autoOpen: false,
  onClose: null,
  onChange: null,
  children: null,
  icon: '',
};

/**
 * `Accordion` is designed to be a container for forms and menus. It renders multiple
 * `AccordionItem`s, keeping track of which one is open in state.
 */
class Accordion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIdx: props.autoOpen ? 0 : null,
    };

    this.onClose = this.onClose.bind(this);
    this.onOpenChild = this.onOpenChild.bind(this);
  }

  onClose(e) {
    const { onClose } = this.props;

    if (e) {
      e.preventDefault();
    }

    if (onClose) {
      onClose();
    }
  }

  onOpenChild(key) {
    const { onChange } = this.props;

    return () => {
      this.setState({ activeIdx: key });

      if (onChange) {
        onChange(key);
      }
    };
  }

  hasActive() {
    const { activeIdx } = this.state;

    return typeof activeIdx !== 'undefined' && activeIdx !== null;
  }

  renderHeader() {
    const { icon, title } = this.props;
    let iconJSX;

    if (icon) {
      iconJSX = (
        <span className="rc-accordion-header-icon">
          <Icon width="16px" height="16px" type={icon} />
        </span>
      );
    }

    return (
      <div className="rc-accordion-header" key="header">
        <div className="rc-accordion-header-main">
          {iconJSX}
          <Heading as="h6" color="subtle" smallTitle>
            {title}
          </Heading>
        </div>
        <span className="rc-accordion-header-action">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="" onClick={this.onClose}>
            <Icon width="8px" height="8px" type="close" />
          </a>
        </span>
      </div>
    );
  }

  renderChild(child, index) {
    const { activeIdx } = this.state;

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
    const { children, title } = this.props;
    const childrenArray = Children.toArray(children).map((c, i) =>
      this.renderChild(c, i),
    );

    if (title) {
      childrenArray.unshift(this.renderHeader());
    }

    return <div className="rc-accordion-items">{childrenArray}</div>;
  }

  render() {
    const { className } = this.props;
    const classNames = classnames('rc-accordion', className);
    const items = this.renderItems();

    return <div className={classNames}>{items}</div>;
  }
}

Accordion.propTypes = propTypes;
Accordion.defaultProps = defaultProps;

export default Accordion;
