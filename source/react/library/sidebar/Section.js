import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Icon from '../icon/Icon';
import { getKey } from '../../helpers/statics';
import { ENTER_KEY_CODE } from '../../constants';

const propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
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
  children: null,
  title: '',
  className: '',
  onSectionClick: () => {},
  onClick: null,
  icon: null,
  open: false,
};

// TODO: clean this up / potentially remove an dreplace with method on subsection item
const getSelectedSubItem = props => {
  const { children } = props;
  let selectedSubItem;

  if (children) {
    const childrenArray = React.Children.toArray(props.children);

    childrenArray.forEach(child => {
      const grandchildArray = React.Children.toArray(child.props.children);

      if (grandchildArray) {
        const activeGrandchildren = grandchildArray.filter(grandchild => {
          let found = null;

          if (grandchild.props) {
            found = grandchild.props.active === true;
          }

          return found;
        });

        if (activeGrandchildren.length > 0) {
          selectedSubItem = activeGrandchildren[0].props.title;
        }
      }
    });
  }

  return selectedSubItem;
};

class Section extends React.Component {
  constructor(props) {
    super(props);
    const selectedSubItem = getSelectedSubItem(props);

    this.state = {
      selectedSubItem,
      open: props.open,
      active: false,
    };

    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onSubItemClick = this.onSubItemClick.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const newState = { open: newProps.open, active: newProps.active };

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

    const { open, active, selectedSubItem } = this.state;
    const { children } = this.props;

    if (open && active) {
      // You cannot minimize an active section
      newState.open = open;
    } else if (children) {
      // Otherwise, toggle open state if has children
      newState.open = !open;
    }

    // When toggling between sections, let's reset state
    // for active subitems in inactive sections
    if (!active && selectedSubItem) {
      newState.selectedSubItem = null;
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
    console.log('onSubItemClick fired')
    this.setState({ selectedSubItem: title, active: true });
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
    const { active, open } = this.state;
    const { title, onClick, icon: iconProp, className } = this.props;
    const classNames = classnames(
      'rc-sidebar-item',
      {
        'rc-sidebar-item-selected': active,
        'rc-sidebar-item-selectable': onClick,
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
