import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import classnames from 'classnames';
import Icon from '../icon/Icon';
import { getKey } from '../../helpers/statics';
import { ENTER_KEY_CODE } from '../../constants';

const propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  /** Easy prop for setting active section */
  active: PropTypes.bool,
  /** Class name(s) to apply to section element */
  className: PropTypes.string,
  /** Transcends Sidebar to correctly set active states */
  onSectionClick: PropTypes.func,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  /** If subsections exist, is section open or closed? */
  open: PropTypes.bool,
  /** Render section label */
  label: PropTypes.node,
  /** Is the sidebar minimized? */
  minimized: PropTypes.bool,
};

const defaultProps = {
  children: [],
  title: '',
  active: false,
  className: '',
  onSectionClick: () => {},
  onClick: null,
  icon: null,
  open: false,
  label: null,
  minimized: false,
};

class Section extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSubItem: null,
      open: props.open,
      active: props.active,
    };

    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onSubItemClick = this.onSubItemClick.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const newState = { active: newProps.active };

    // Reset active subitems if accordion is now closed
    if (!newProps.open) {
      newState.selectedSubItem = false;
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
    const newState = {};

    const { open, selectedSubItem } = this.state;
    const { children, onSectionClick, onClick, minimized } = this.props;

    const isAccordion = !!children;
    onSectionClick(isAccordion);

    if (selectedSubItem) {
      // You cannot minimize an active section
      newState.open = open;
    } else if (isAccordion) {
      // Otherwise, toggle open state if has children
      newState.open = !open;
    }

    // If clicking on a toggled accordion, always force open
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

  onSubItemClick(title) {
    this.setState({
      selectedSubItem: title,
      active: true,
    });
  }

  renderSubsections() {
    const { selectedSubItem } = this.state;
    const { children } = this.props;

    return React.Children.map(children, (subsection, idx) => {
      const props = {
        key: getKey(subsection, idx),
        onSubItemClick: this.onSubItemClick,
        selectedItem: selectedSubItem,
      };

      return React.cloneElement(subsection, props);
    });
  }

  render() {
    const { active, open, selectedSubItem } = this.state;
    const { title, icon: iconProp, className } = this.props;
    const classNames = classnames(
      'rc-sidebar-item',
      {
        'rc-sidebar-item-selected': active || selectedSubItem,
        'rc-sidebar-item-open': open && selectedSubItem,
      },
      className,
    );

    let subsections = [];

    if (open) {
      subsections = this.renderSubsections();
    }

    if (subsections && subsections.length) {
      subsections = <div className="rc-sidebar-items">{subsections}</div>;
    }

    let icon;
    if (iconProp) {
      icon = (
        <span className="rc-sidebar-item-icon">
          <Icon width="16px" height="16px" type={iconProp} />
        </span>
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

    return (
      /* eslint-disable jsx-a11y/anchor-is-valid */
      <Fragment>
        {label}
        <li className={classNames}>
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
            </div>
          </a>
          {subsections}
        </li>
      </Fragment>
      /* eslint-enable jsx-a11y/anchor-is-valid */
    );
  }
}

Section.propTypes = propTypes;
Section.defaultProps = defaultProps;

export default Section;
