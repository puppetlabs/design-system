import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Icon from '../icon/Icon';
import { getKey } from '../../helpers/statics';

const propTypes = {
  children: PropTypes.any,
  title: PropTypes.any,
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

const isActive = (props) => {
  const { selected, title } = props;

  let active = props.active;
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
    this.onSubItemClick = this.onSubItemClick.bind(this);
    this.onSubsectionClick = this.onSubsectionClick.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const active = isActive(newProps);

    if (active !== this.state.active) {
      this.setState({ active });
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
    this.setState({ selectedSubItem: title });
    this.props.onSectionClick(this.props.title);
  }

  onSubsectionClick(title) {
    this.setState({ selectedSubsection: title });
  }

  renderSubsections() {
    const isActiveSubsection = (subsection, idx) => {
      if (this.state.active && !this.state.selectedSubsection && idx === 0) {
        return true;
      }

      return subsection.props.title && subsection.props.title === this.state.selectedSubsection;
    };

    return React.Children.map(this.props.children, (subsection, idx) => {
      const props = {
        key: getKey(subsection, idx),
        onSubItemClick: this.onSubItemClick,
        onSubsectionClick: this.onSubsectionClick,
        selected: isActiveSubsection(subsection, idx),
        selectedItem: this.state.selectedSubItem,
      };

      return React.cloneElement(subsection, props);
    });
  }

  render() {
    const { title, onClick } = this.props;
    const className = classnames('rc-sidebar-section', {
      'rc-sidebar-section-selected': this.state.active,
      'rc-sidebar-section-selectable': onClick,
      'rc-sidebar-section-closed': !this.state.open,
    }, this.props.className);

    let subsections = [];
    if (this.state.active) {
      subsections = this.renderSubsections();
    }

    if (subsections && subsections.length) {
      subsections = (
        <ul className="rc-sidebar-subsections">
          { subsections }
        </ul>
      );
    }

    let icon;
    if (this.props.icon) {
      icon = (
        <span className="rc-sidebar-section-icon">
          <Icon width="24px" height="24px" type={ this.props.icon } />
        </span>
      );
    }

    return (
      <div className={ className }>
        <a className="rc-sidebar-section-link" role="button" tabIndex={ 0 } onClick={ this.onClick }>
          <div className="rc-sidebar-section-header">
            { icon }
            <span className="rc-sidebar-section-title">{ title }</span>
          </div>
        </a>
        { subsections }
      </div>
    );
  }
}

Section.propTypes = propTypes;
Section.defaultProps = defaultProps;

export default Section;
