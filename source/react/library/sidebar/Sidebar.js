import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { getKey } from '../../helpers/statics';
import Button from '../buttons/Button';
import Section from './Section';
import SectionLabel from './SectionLabel';
import Subsection from './Subsection';
import SubsectionItem from './SubsectionItem';

const propTypes = {
  children: PropTypes.node,
  /** Easy prop to enable toggle between sidebar sizes */
  togglable: PropTypes.bool,
  /** Is sidebar at the smaller size? */
  minimized: PropTypes.bool,
};

const defaultProps = {
  children: [],
  togglable: false,
  minimized: false,
};

/**
 * `Sidebar` displays high-level navigation with optional subsections and actions.
 */
class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      minimized: props.minimized,
    };

    this.onSectionClick = this.onSectionClick.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  onSectionClick(title, isAccordion) {
    console.log('onSectionClick fired')

    if (isAccordion) {
      this.setState({ minimized: false });
    }
  }

  onToggle() {
    const { minimized } = this.state;

    this.setState({ minimized: !minimized });
  }

  getSections() {
    const { children } = this.props;

    return React.Children.map(children, (section, idx) => {
      const props = {
        key: getKey(section, idx),
        onSectionClick: this.onSectionClick,
      };

      return React.cloneElement(section, props);
    });
  }

  getToggle() {
    const { minimized } = this.state;
    let icon = 'chevron-left';

    if (minimized) {
      icon = 'chevron-right';
    }

    return (
      <div className="rc-sidebar-toggle">
        <Button
          className="rc-sidebar-toggle-btn"
          onClick={this.onToggle}
          block
          transparent
          icon={icon}
        />
      </div>
    );
  }

  render() {
    const { togglable } = this.props;
    const { minimized } = this.state;
    const sections = this.getSections();

    const className = classnames('rc-sidebar', {
      'rc-sidebar-minimized': minimized,
    });

    let toggle;
    if (togglable) {
      toggle = this.getToggle();
    }

    return (
      <div className={className}>
        <ul className="rc-sidebar-level-1">{sections}</ul>
        {toggle}
      </div>
    );
  }
}

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

Sidebar.Section = Section;
Sidebar.SectionLabel = SectionLabel;
Sidebar.Subsection = Subsection;
Sidebar.SubsectionItem = SubsectionItem;

export default Sidebar;
