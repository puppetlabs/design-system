import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { getKey } from '../../helpers/statics';
import Button from '../buttons/Button';
import Section from './Section';
import Item from './Item';
import Accordion from './SidebarAccordion';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /** Easy prop to enable toggle between sidebar sizes */
  togglable: PropTypes.bool,
  /** Is sidebar at the smaller size? */
  minimized: PropTypes.bool,
  /** Helpful for forcing a resize event to update svg drawings */
  onToggle: PropTypes.func,
  /** Shows logo in sidebar */
  logo: PropTypes.element,
  onLogoClick: PropTypes.func,
  /** Determines colors */
  theme: PropTypes.oneOf(['dark', null]),
};

const defaultProps = {
  children: [],
  className: '',
  togglable: false,
  minimized: false,
  onToggle: () => {},
  logo: undefined,
  onLogoClick: undefined,
  theme: null,
};

/**
 * `Sidebar` displays high-level navigation with optional subsections and actions.
 */
class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      minimized: props.minimized,
    };

    this.onToggle = this.onToggle.bind(this);
    this.onLogoClick = this.onLogoClick.bind(this);
  }

  onToggle() {
    const { minimized } = this.state;
    const { onToggle } = this.props;

    onToggle();

    this.setState({ minimized: !minimized });
  }

  onLogoClick() {
    const { onLogoClick } = this.props;
    // this.setState({ menuOpen: false });

    if (onLogoClick) {
      onLogoClick();
    }
  }

  getToggle() {
    const { minimized } = this.state;
    let icon = 'chevron-left';

    if (minimized) {
      icon = 'chevron-right';
    }

    return (
      <div className="rc-sidebar-toggle">
        <Button
          className="rc-sidebar-toggle-btn"
          onClick={this.onToggle}
          block
          transparent
          icon={icon}
        />
      </div>
    );
  }

  renderChildren() {
    const { children } = this.props;
    const { minimized } = this.state;

    return React.Children.map(children, (child, idx) => {
      const props = {
        key: getKey(child, idx),
        minimized,
      };

      return React.cloneElement(child, props);
    });
  }

  renderLogo() {
    const { logo, onLogoClick } = this.props;
    let jsx = logo;

    // TODO: This should render a button element or an anchor if its for navigation
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/anchor-is-valid */
    if (jsx && onLogoClick) {
      jsx = (
        <a role="button" tabIndex={0} onClick={this.onLogoClick}>
          <span className="rc-visually-hidden">Home</span>
          {jsx}
        </a>
      );
    }
    /* eslint-enable */

    if (jsx) {
      jsx = <div className="rc-sidebar-logo">{jsx}</div>;
    }

    return jsx;
  }

  render() {
    const { togglable, theme, className } = this.props;
    const { minimized } = this.state;
    const children = this.renderChildren();
    const logo = this.renderLogo();

    const classNames = classnames('rc-sidebar', className, {
      'rc-sidebar-minimized': minimized,
      [`rc-sidebar-${theme}`]: theme,
    });

    let toggle;
    if (togglable) {
      toggle = this.getToggle();
    }

    return (
      <aside className={classNames}>
        {logo}
        <nav
          role="navigation"
          aria-label="Main"
          className="rc-sidebar-container"
        >
          {children}
        </nav>
        {toggle}
      </aside>
    );
  }
}

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

Sidebar.Section = Section;
Sidebar.Item = Item;
Sidebar.Accordion = Accordion;

export default Sidebar;
