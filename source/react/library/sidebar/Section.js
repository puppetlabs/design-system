import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Icon from '../icon/Icon';
import { getKey } from '../../helpers/statics';
import { ENTER_KEY_CODE } from '../../constants';

const propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  /** The title of the active section */
  // eslint-disable-next-line react/no-unused-prop-types
  selected: PropTypes.string,
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
};

const defaultProps = {
  children: [],
  title: '',
  selected: null,
  active: false,
  className: '',
  onSectionClick: () => {},
  onClick: null,
  icon: null,
  open: false,
};

const isActive = props => {
  const { selected, title, active: activeProp } = props;

  let active = activeProp;
  active = selected ? title === selected : active;

  return active;
};

const getSelectedSubItem = props => {
  const { children } = props;
  let selectedSubItem;

  if (children) {
    const childrenArray = React.Children.toArray(props.children);

    childrenArray.forEach(child => {
      const grandchildArray = React.Children.toArray(child.props.children);

      if (grandchildArray) {
        const activeGrandchildren = grandchildArray.filter(grandchild => {
          return grandchild.props.active === true;
        });

        if (activeGrandchildren.length > 0) {
          selectedSubItem = activeGrandchildren[0].props.title;
        }
      }
    });
  }

  return selectedSubItem;
};

class Section extends React.Component {
  constructor(props) {
    super(props);
    const selectedSubItem = getSelectedSubItem(props);

    this.state = {
      selectedSubItem,
      selectedSubsection: null,
      open: props.open,
      active: isActive(props),
    };

    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onSubItemClick = this.onSubItemClick.bind(this);
    this.onSubsectionClick = this.onSubsectionClick.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const active = isActive(newProps);
    const { active: activeState } = this.state;
    const newState = { open: newProps.open };

    if (active !== activeState) {
      newState.active = active;
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

    const { open, active, selectedSubItem, selectedSubsection } = this.state;
    // Set open state based on condition:
    // You cannot minimize a non-active section
    if (!(open && !active)) {
      newState.open = !open;
    }

    // You cannot minimize an active section
    if (open && active) {
      newState.open = open;
    // Minimize if open
    } else if (open) {
      newState.open = !open;
    }

    // When toggling between sections, let's reset state
    // for active subitems in inactive sections
    if (!active && selectedSubItem) {
      newState.selectedSubItem = null;
    }

    // Same with subsections
    if (!active && selectedSubsection) {
      newState.selectedSubsection = null;
    }

    const { onSectionClick, onClick, title } = this.props;
    onSectionClick(title);

    if (Object.keys(newState).length) {
      this.setState(newState);
    }

    if (onClick) {
      onClick();
    }
  }

  onSubItemClick(title) {
    const { title: titleProp, onSectionClick } = this.props;
    this.setState({ selectedSubItem: title, active: true });
    onSectionClick(titleProp);
  }

  onSubsectionClick(title) {
    this.setState({ selectedSubsection: title });
  }

  renderSubsections() {
    const { open, selectedSubsection, selectedSubItem } = this.state;
    const { children } = this.props;

    const isActiveSubsection = (subsection, idx) => {
      if (open && !selectedSubsection && idx === 0) {
        return true;
      }

      return (
        subsection.props.title && subsection.props.title === selectedSubsection
      );
    };

    return React.Children.map(children, (subsection, idx) => {
      const props = {
        key: getKey(subsection, idx),
        onSubItemClick: this.onSubItemClick,
        onSubsectionClick: this.onSubsectionClick,
        selected: isActiveSubsection(subsection, idx),
        selectedItem: selectedSubItem,
      };

      return React.cloneElement(subsection, props);
    });
  }

  render() {
    const { active, open, selectedSubItem } = this.state;
    const { title, onClick, icon: iconProp, className } = this.props;
    const classNames = classnames(
      'rc-sidebar-item',
      {
        'rc-sidebar-item-selected': active && !selectedSubItem,
        'rc-sidebar-item-selectable': onClick,
        'rc-sidebar-item-closed': !open,
        'rc-sidebar-item-open': open,
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

    return (
      /* eslint-disable jsx-a11y/anchor-is-valid */
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
      /* eslint-enable jsx-a11y/anchor-is-valid */
    );
  }
}

Section.propTypes = propTypes;
Section.defaultProps = defaultProps;

export default Section;
