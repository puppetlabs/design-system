import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Icon from '../icon/Icon';

const propTypes = {
  title: PropTypes.any,
  style: PropTypes.string,
  /** The focussed sidebar section */
  selected: PropTypes.string,
  /** Is selected? */
  active: PropTypes.bool,
  /** Class name to apply to section element */
  className: PropTypes.string,
  /** Transcends Sidebar to correctly set active states */
  onSectionClick: PropTypes.func,
  icon: PropTypes.string,
};

const defaultProps = {
  style: '',
  selected: null,
  active: false,
  className: '',
  title: '',
  onSectionClick: () => {},
  icon: null,
};

class SidebarSection extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();

    if (this.props.onSectionClick) {
      this.props.onSectionClick(e, this.props.title);
    }
  }

  render() {
    const { active, selected, style, title, onSectionClick } = this.props;

    const className = classnames('rc-sidebar-section', {
      'rc-sidebar-section-selected': selected ? title === selected : active,
      [`rc-sidebar-section-${style}`]: style,
      'rc-sidebar-section-selectable': onSectionClick,
    }, this.props.className);

    let icon;
    if (this.props.icon) {
      icon = (
        <span className="rc-accordion-header-icon">
          <Icon width="16px" height="16px" type={ this.props.icon } />
        </span>
      );
    }

    const props = {
      className,
    };

    return (
      <div role="button" tabIndex={ 0 } onClick={ this.onClick } { ...props } >
        { icon }
        { title }
      </div>
    );
  }
}

SidebarSection.propTypes = propTypes;
SidebarSection.defaultProps = defaultProps;

export default SidebarSection;
