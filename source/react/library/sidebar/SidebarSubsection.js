import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { getKey } from '../../helpers/statics';

const propTypes = {
  title: PropTypes.any,
  /** The title of the active option */
  selected: PropTypes.string,
  /** Class name(s) to apply to subsection element */
  className: PropTypes.string,
  /** Transcends Sidebar to correctly set active states */
  onSubsectionClick: PropTypes.func,
  /** List of subsections options */
  options: PropTypes.array,
};

const defaultProps = {
  title: '',
  selected: null,
  className: '',
  onSubsectionClick: () => {},
  options: [],
};

class SidebarSubsection extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();

    if (this.props.onSubsectionClick) {
      this.props.onSubsectionClick(e.target.title);
    }
  }

  getSubsectionOptions() {
    return this.props.options.map((option, idx) => {
      const selected = this.props.selected ? option.title === this.props.selected : option.active;
      const className = classnames('rc-sidebar-subsection-option', {
        'rc-sidebar-subsection-option-selected': selected,
      });

      const props = {
        key: getKey(option, idx),
        className,
      };

      return (
        <li { ...props }>
          <a className="rc-sidebar-subsection-link" role="button" tabIndex={ 0 } onClick={ this.onClick } title={ option.title } >
            { option.title }
          </a>
        </li>
      );
    });
  }

  render() {
    const options = this.getSubsectionOptions();

    return (
      <div className="rc-sidebar-subsection">
        <div className="rc-sidebar-subsection-header">
          <span className="rc-sidebar-subsection-title">
            { this.props.title }
          </span>
          { /* add in optional button */ }
        </div>
        <div className="rc-sidebar-subsection-options">
          { options }
        </div>
      </div>
    );
  }
}

SidebarSubsection.propTypes = propTypes;
SidebarSubsection.defaultProps = defaultProps;

export default SidebarSubsection;
