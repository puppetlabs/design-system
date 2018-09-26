import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { getKey } from '../../helpers/statics';
import Button from '../buttons/Button';
import Section from './Section';
import Subsection from './Subsection';
import SubsectionItem from './SubsectionItem';

const propTypes = {
  children: PropTypes.node,
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
      activeSection: null,
    };

    this.onSectionClick = this.onSectionClick.bind(this);
    this.onToggle = this.onToggle.bind(this);
    this.onLogoClick = this.onLogoClick.bind(this);
  }

  onSectionClick(title, isAccordion) {
    const newState = {};

    if (isAccordion) {
      newState.minimized = false;
    } else {
      newState.activeSection = title;
    }

    this.setState(newState);
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

  getSections() {
    const { children } = this.props;
    const { minimized, activeSection } = this.state;

    return React.Children.map(children, (section, idx) => {
      const props = {
        key: getKey(section, idx),
        onSectionClick: this.onSectionClick,
        minimized,
        activeSection,
      };

      return React.cloneElement(section, props);
    });
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

  renderLogo() {
    const { logo, onLogoClick } = this.props;
    let jsx = logo;

    // TODO: This should render a button element or an anchor if its for navigation
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/anchor-is-valid */
    if (jsx && onLogoClick) {
      jsx = (
        <a role="button" tabIndex={0} onClick={this.onLogoClick}>
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
    const { togglable, theme } = this.props;
    const { minimized } = this.state;
    const sections = this.getSections();
    const logo = this.renderLogo();

    const className = classnames('rc-sidebar', {
      'rc-sidebar-minimized': minimized,
      [`rc-sidebar-${theme}`]: theme,
    });

    let toggle;
    if (togglable) {
      toggle = this.getToggle();
    }

    return (
      <div className={className}>
        {logo}
        <ul className="rc-sidebar-level-1">{sections}</ul>
        {toggle}
      </div>
    );
  }
}

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

Sidebar.Section = Section;
Sidebar.Subsection = Subsection;
Sidebar.SubsectionItem = SubsectionItem;

export default Sidebar;
