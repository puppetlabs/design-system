import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const propTypes = {
  title: PropTypes.any,
  /** Transcends Sidebar to correctly set active states */
  onSubItemClick: PropTypes.func,
  onClick: PropTypes.func,
  /** Easy prop for setting default selected item */
  default: PropTypes.bool,
  /** The title of the active item */
  selected: PropTypes.string,
};

const defaultProps = {
  title: '',
  onSubItemClick: () => {},
  onClick: null,
  default: false,
  selected: null,
};

class SubsectionItem extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    // Load default item
    if (this.props.default) {
      this.props.onSubItemClick(this.props.title);
    }
  }

  onClick(e) {
    e.preventDefault();

    const { onSubItemClick, onClick, title } = this.props;
    onSubItemClick(title);

    if (onClick) {
      onClick();
    }
  }

  render() {
    const active = this.props.title === this.props.selected;
    const className = classnames('rc-sidebar-subsection-item', {
      'rc-sidebar-subsection-item-selected': active,
    });

    return (
      <li className={ className }>
        <a className="rc-sidebar-subsection-link" role="button" tabIndex={ 0 } onClick={ this.onClick }>
          <div className="rc-sidebar-subsection-item-header">
            <span className="rc-sidebar-subsection-item-title">{ this.props.title }</span>
          </div>
        </a>
      </li>
    );
  }
}

SubsectionItem.propTypes = propTypes;
SubsectionItem.defaultProps = defaultProps;

export default SubsectionItem;
