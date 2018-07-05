import PropTypes from 'prop-types';
import React from 'react';
import { getKey } from '../../helpers/statics';

const propTypes = {
  children: PropTypes.any,
  title: PropTypes.any,
  /** The title of the active option */
  selected: PropTypes.string,
  /** Transcends Sidebar to correctly set active states */
  onSubsectionClick: PropTypes.func,
};

const defaultProps = {
  children: [],
  title: '',
  selected: null,
  onSubsectionClick: () => {},
};

class Subsection extends React.Component {
  constructor(props) {
    super(props);

    this.onSubsectionClick = this.onSubsectionClick.bind(this);
  }

  onSubsectionClick(title) {
    if (this.props.onSubsectionClick) {
      this.props.onSubsectionClick(title);
    }
  }

  getSubsectionOptions() {
    return React.Children.map(this.props.children, (option, idx) => {
      const props = {
        key: getKey(option, idx),
        onSubsectionClick: this.onSubsectionClick,
        selected: this.props.selected,
      };

      return React.cloneElement(option, props);
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

Subsection.propTypes = propTypes;
Subsection.defaultProps = defaultProps;

export default Subsection;
