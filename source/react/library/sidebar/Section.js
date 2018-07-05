import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Icon from '../icon/Icon';
import { getKey } from '../../helpers/statics';

const propTypes = {
  children: PropTypes.any,
  title: PropTypes.any,
  /** The title of the active section */
  selected: PropTypes.string,
  /** Easy prop for setting default active section */
  active: PropTypes.bool,
  /** Class name(s) to apply to section element */
  className: PropTypes.string,
  /** Transcends Sidebar to correctly set active states */
  onSectionClick: PropTypes.func,
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
      selectedSubOption: null,
      open: props.open,
      active: isActive(props),
    };

    this.onClick = this.onClick.bind(this);
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

    if (!(this.state.open && !this.state.active)) {
      this.setState({ open: !this.state.open });
    }

    if (this.props.onSectionClick) {
      this.props.onSectionClick(this.props.title);
    }
  }

  onSubsectionClick(title) {
    this.setState({ selectedSubOption: title });
    this.props.onSectionClick(this.props.title);
  }

  getSubsections() {
    return React.Children.map(this.props.children, (subsection, idx) => {
      const { active, selectedSubOption } = this.state;
      const selected = active ? selectedSubOption : null;

      const props = {
        key: getKey(subsection, idx),
        onSubsectionClick: this.onSubsectionClick,
        selected,
      };

      return React.cloneElement(subsection, props);
    });
  }

  render() {
    const { title, onSectionClick } = this.props;
    const className = classnames('rc-sidebar-section', {
      'rc-sidebar-section-selected': this.state.active,
      'rc-sidebar-section-selectable': onSectionClick,
      'rc-sidebar-section-closed': !this.state.open,
    }, this.props.className);

    let subsections = this.getSubsections();
    if (subsections.length) {
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

    const props = {
      className,
    };

    return (
      <div className="rc-sidebar-section" { ...props }>
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
