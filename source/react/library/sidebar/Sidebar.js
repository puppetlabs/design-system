import PropTypes from 'prop-types';
import React from 'react';
import { getKey } from '../../helpers/statics';

const propTypes = {
  children: PropTypes.any,
  /** Sidebar section width in px or % */
  width: PropTypes.string,
};

const defaultProps = {
  children: null,
  width: '',
};

/**
 * `Sidebar` displays high-level navigation with optional subsections and actions.
 */
class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: null,
    };

    this.onSectionClick = this.onSectionClick.bind(this);
  }

  onSectionClick(e, title) {
    e.preventDefault();

    this.setState({ selected: title });
  }

  getSections() {
    return this.props.children.map((section, idx) => {
      const props = {
        key: getKey(section, idx),
        onSectionClick: this.onSectionClick,
        selected: this.state.selected,
      };

      return React.cloneElement(section, props);
    });
  }

  render() {
    const sections = this.getSections();

    const props = {
      width: this.props.width,
    };

    return (
      <div { ...props } className="rc-sidebar">
        { sections }
      </div>
    );
  }
}

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

export default Sidebar;
