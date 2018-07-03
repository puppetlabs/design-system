import PropTypes from 'prop-types';
import React from 'react';
import { getKey } from '../../helpers/statics';

const propTypes = {
  children: PropTypes.any,
  /** Sidebar section width in px or % */
  width: PropTypes.string,
};

const defaultProps = {
  children: [],
  width: '240px',
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

  onSectionClick(title) {
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
    const width = this.props.width;
    const sections = this.getSections();
    const styles = {};

    if (width) {
      styles.width = width;
    }

    const props = {
      style: styles,
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
