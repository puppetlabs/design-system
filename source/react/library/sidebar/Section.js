import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Icon from '../icon/Icon';
import { getKey } from '../../helpers/statics';
import { ENTER_KEY_CODE } from '../../constants';

const propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
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
  active: false,
  className: '',
  onSectionClick: () => {},
  onClick: null,
  icon: null,
  open: false,
};

class Section extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSubItem: null,
      open: props.open,
      active: props.active,
    };

    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onSubItemClick = this.onSubItemClick.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const newState = { open: newProps.open, active: newProps.active };

    // Reset active subitems if accordion is now closed
    if (!newProps.open) {
      newState.selectedSubItem = false;
    }

    this.setState(newState);
  }

  onKeyDown(e) {
    if (e.keyCode === ENTER_KEY_CODE) {
      this.onClick(e);
    }
  }

  onClick(e) {
    e.preventDefault();
    const newState = {};

    const { open, selectedSubItem } = this.state;
    const { children } = this.props;

    if (selectedSubItem && open) {
      // You cannot minimize an active section
      newState.open = open;
    } else if (children) {
      // Otherwise, toggle open state if has children
      newState.open = !open;
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
    this.setState({
      selectedSubItem: title,
      active: true,
    });
  }

  renderSubsections() {
    const { selectedSubItem } = this.state;
    const { children } = this.props;

    return React.Children.map(children, (subsection, idx) => {
      const props = {
        key: getKey(subsection, idx),
        onSubItemClick: this.onSubItemClick,
        selectedItem: selectedSubItem,
      };

      return React.cloneElement(subsection, props);
    });
  }

  render() {
    const { active, open, selectedSubItem } = this.state;
    const { title, icon: iconProp, className } = this.props;
    const classNames = classnames(
      'rc-sidebar-item',
      {
        'rc-sidebar-item-selected': active || selectedSubItem,
        'rc-sidebar-item-open': open,
      },
      className,
    );

    let subsections = [];

    if (open) {
      subsections = this.renderSubsections();
    }

    if (subsections && subsections.length) {
      subsections = <div className="rc-sidebar-items">{subsections}</div>;
    }

    let icon;
    if (iconProp) {
      icon = (
        <span className="rc-sidebar-item-icon">
          <Icon width="16px" height="16px" type={iconProp} />
        </span>
      );
    }

    return (
      /* eslint-disable jsx-a11y/anchor-is-valid */
      <li className={classNames}>
        <a
          className="rc-sidebar-item-link"
          role="button"
          tabIndex={0}
          onClick={this.onClick}
          onKeyDown={this.onKeyDown}
        >
          <div className="rc-sidebar-item-content">
            {icon}
            <span className="rc-sidebar-item-title">{title}</span>
          </div>
        </a>
        {subsections}
      </li>
      /* eslint-enable jsx-a11y/anchor-is-valid */
    );
  }
}

Section.propTypes = propTypes;
Section.defaultProps = defaultProps;

export default Section;
