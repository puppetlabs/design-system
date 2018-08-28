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

class Section extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSubItem: null,
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

    if (active !== activeState) {
      this.setState({ active });
    }
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
    this.setState({ selectedSubItem: title });
    onSectionClick(titleProp);
  }

  onSubsectionClick(title) {
    this.setState({ selectedSubsection: title });
  }

  renderSubsections() {
    const { active, selectedSubsection, selectedSubItem } = this.state;
    const { children } = this.props;

    const isActiveSubsection = (subsection, idx) => {
      if (active && !selectedSubsection && idx === 0) {
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
    const { active, open } = this.state;
    const { title, onClick, icon: iconProp, className } = this.props;
    const classNames = classnames(
      'rc-sidebar-section',
      {
        'rc-sidebar-section-selected': active,
        'rc-sidebar-section-selectable': onClick,
        'rc-sidebar-section-closed': !open,
      },
      className,
    );

    let subsections = [];
    if (active) {
      subsections = this.renderSubsections();
    }

    if (subsections && subsections.length) {
      subsections = <ul className="rc-sidebar-subsections">{subsections}</ul>;
    }

    let icon;
    if (iconProp) {
      icon = (
        <span className="rc-sidebar-section-icon">
          <Icon width="24px" height="24px" type={iconProp} />
        </span>
      );
    }

    return (
      /* eslint-disable jsx-a11y/anchor-is-valid */
      <div className={classNames}>
        <a
          className="rc-sidebar-section-link"
          role="button"
          tabIndex={0}
          onClick={this.onClick}
          onKeyDown={this.onKeyDown}
        >
          <div className="rc-sidebar-section-header">
            {icon}
            <span className="rc-sidebar-section-title">{title}</span>
          </div>
        </a>
        {subsections}
      </div>
      /* eslint-enable jsx-a11y/anchor-is-valid */
    );
  }
}

Section.propTypes = propTypes;
Section.defaultProps = defaultProps;

export default Section;
