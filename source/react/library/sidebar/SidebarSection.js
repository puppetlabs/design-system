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
  /** Optional accordian flag for subsection reveal */
  accordion: PropTypes.bool,
};

const defaultProps = {
  children: [],
  title: '',
  selected: null,
  active: false,
  className: '',
  onSectionClick: () => {},
  icon: null,
  accordion: false,
};

class SidebarSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: null,
    };

    this.onClick = this.onClick.bind(this);
    this.onSubsectionClick = this.onSubsectionClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();

    if (this.props.onSectionClick) {
      this.props.onSectionClick(this.props.title);
    }
  }

  onSubsectionClick(title) {
    this.setState({ selected: title });
    this.props.onSectionClick(this.props.title);
  }

  getSubsections() {
    return this.props.children.map((subsection, idx) => {
      const props = {
        key: getKey(subsection, idx),
        onSubsectionClick: this.onSubsectionClick,
        selected: this.state.selected,
      };

      return React.cloneElement(subsection, props);
    });
  }

  render() {
    const { active, title, onSectionClick } = this.props;
    const selected = this.props.selected ? title === this.props.selected : active;
    const className = classnames('rc-sidebar-section', {
      'rc-sidebar-section-selected': selected,
      'rc-sidebar-section-selectable': onSectionClick,
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

SidebarSection.propTypes = propTypes;
SidebarSection.defaultProps = defaultProps;

export default SidebarSection;
