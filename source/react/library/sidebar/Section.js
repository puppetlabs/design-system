import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import classnames from 'classnames';
import Icon from '../icon/Icon';
import Badge from '../badge/Badge';
import TooltipHoverArea from '../tooltips/TooltipHoverArea';
import { getKey } from '../../helpers/statics';
import { ENTER_KEY_CODE } from '../../constants';

const propTypes = {
  children: PropTypes.node,
  /** Section title that renders as the link text */
  title: PropTypes.string,
  /** Section label that renders above section title */
  label: PropTypes.node,
  /** Easy prop for setting active section */
  active: PropTypes.bool,
  /** Name of active section */
  activeSection: PropTypes.string,
  /** Name of active subsection item */
  activeSubItem: PropTypes.string,
  /** Class name(s) to apply to section element */
  className: PropTypes.string,
  /** Transcends Sidebar to correctly set active states */
  onSectionClick: PropTypes.func,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  /** If subsection exist, is section open or closed? */
  open: PropTypes.bool,
  /** Is the sidebar minimized? */
  minimized: PropTypes.bool,
  /** Should we display a badge with count of subitems? */
  count: PropTypes.bool,
};

const defaultProps = {
  children: null,
  title: '',
  active: false,
  activeSection: null,
  activeSubItem: null,
  className: '',
  onSectionClick: () => {},
  onClick: null,
  icon: null,
  open: false,
  label: null,
  minimized: false,
  count: false,
};

class Section extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: props.open,
      active: props.active ? props.active : props.activeSection === props.title,
      selectedSubItem: props.activeSubItem,
    };

    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onSubItemClick = this.onSubItemClick.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const newState = { active: newProps.active };

    // If a new active section name is passed down, check to see if it's a match
    if (newProps.activeSection) {
      newState.active = newProps.activeSection === newProps.title;
    }

    // If an active subitem is passed down, set it
    if (newProps.activeSubItem) {
      newState.selectedSubItem = newProps.activeSubItem;
    } else if (!newProps.open || !newState.active) {
      // Reset active subitem if section is now closed or inactive
      newState.selectedSubItem = null;
    }

    this.setState(newState);
  }

  onKeyDown(e) {
    if (e.keyCode === ENTER_KEY_CODE) {
      this.onClick(e);
    }
  }

  onClick(e) {
    e.preventDefault();
    const { children, title, onSectionClick, onClick, minimized } = this.props;
    const { open } = this.state;
    const newState = {};

    const isAccordion = !!children;

    onSectionClick(title, isAccordion);

    // If section has children, enable toggle
    if (isAccordion) {
      newState.open = !open;
    }

    // If sidebar is minimized and user clicks an accordion section, always force section to open
    if (minimized && isAccordion) {
      newState.open = true;
    }

    if (Object.keys(newState).length) {
      this.setState(newState);
    }

    if (onClick) {
      onClick();
    }
  }

  onSubItemClick(slug) {
    const { onSectionClick, title } = this.props;

    onSectionClick(title);

    this.setState({
      selectedSubItem: slug,
      active: true,
    });
  }

  getSubsectionLength() {
    const { children } = this.props;
    const { children: subsection } = children.props;

    return React.Children.toArray(subsection).length;
  }

  renderSubsection() {
    const { selectedSubItem } = this.state;
    const { children } = this.props;

    return React.Children.map(children, (subsection, idx) => {
      const key = getKey(subsection, idx);

      const props = {
        key,
        onSubItemClick: this.onSubItemClick,
        selectedItem: selectedSubItem,
      };

      return React.cloneElement(subsection, props);
    });
  }

  render() {
    const { active, open, selectedSubItem } = this.state;
    const {
      title,
      icon: iconProp,
      children,
      className,
      minimized,
      count,
    } = this.props;

    const classNames = classnames(
      'rc-sidebar-item',
      {
        'rc-sidebar-item-selected': active || selectedSubItem,
        'rc-sidebar-item-active-accordion': open && selectedSubItem,
      },
      className,
    );

    let karet;
    let badge;
    let subsection;
    let subsectionLength;

    if (children) {
      subsectionLength = this.getSubsectionLength();

      karet = (
        <span className="rc-sidebar-item-karet">
          <Icon width="8px" height="8px" type="chevron-down" />
        </span>
      );

      if (count) {
        badge = (
          <span className="rc-sidebar-item-badge">
            <Badge type="pill" color="neutral">
              {subsectionLength}
            </Badge>
          </span>
        );
      }
    }

    if (open) {
      subsection = this.renderSubsection();

      subsection = <div className="rc-sidebar-items">{subsection}</div>;
    }

    let icon;
    if (iconProp) {
      icon = (
        <span className="rc-sidebar-item-icon">
          <Icon width="16px" height="16px" type={iconProp} />
        </span>
      );
    }

    if (minimized) {
      icon = (
        <TooltipHoverArea tooltip={title} anchor="right">
          {icon}
        </TooltipHoverArea>
      );
    }

    let { label } = this.props;
    if (label) {
      label = (
        <div>
          <span className="rc-sidebar-divider" />
          <span className="rc-sidebar-label">{label}</span>
        </div>
      );
    }

    const link = (
      /* eslint-disable jsx-a11y/anchor-is-valid */
      <a
        className="rc-sidebar-item-link"
        role="button"
        tabIndex={0}
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
      >
        <div className="rc-sidebar-item-content">
          {icon}
          <span className="rc-sidebar-item-title">{title}</span>
          {badge}
          {karet}
        </div>
      </a>
      /* eslint-enable jsx-a11y/anchor-is-valid */
    );

    return (
      <Fragment>
        {label}
        <li className={classNames}>
          {link}
          {subsection}
        </li>
      </Fragment>
    );
  }
}

Section.propTypes = propTypes;
Section.defaultProps = defaultProps;

export default Section;
