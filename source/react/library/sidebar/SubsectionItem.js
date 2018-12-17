import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { ENTER_KEY_CODE } from '../../constants';

const propTypes = {
  slug: PropTypes.string,
  title: PropTypes.string,
  /** Transcends Sidebar to correctly set active states */
  onSubItemClick: PropTypes.func,
  onClick: PropTypes.func,
  /** Easy prop for setting active item */
  active: PropTypes.bool,
  /** The title of the active item */
  selected: PropTypes.string,
  className: PropTypes.string,
};

const defaultProps = {
  slug: '',
  title: '',
  onSubItemClick: () => {},
  onClick: null,
  active: false,
  selected: null,
  className: '',
};

class SubsectionItem extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentWillMount() {
    const { active, onSubItemClick, title } = this.props;

    // Load default active item
    if (active) {
      onSubItemClick(title);
    }
  }

  onKeyDown(e) {
    if (e.keyCode === ENTER_KEY_CODE) {
      this.onClick(e);
    }
  }

  onClick(e) {
    e.preventDefault();

    const { onSubItemClick, onClick, slug } = this.props;
    onSubItemClick(slug);

    if (onClick) {
      onClick();
    }
  }

  render() {
    const { title, slug, selected, className: classProp } = this.props;
    const active = slug === selected;
    const className = classnames('rc-sidebar-item', classProp, {
      'rc-sidebar-item-selected': active,
    });

    return (
      /* eslint-disable jsx-a11y/anchor-is-valid */
      <li className={className}>
        <a
          className="rc-sidebar-item-link"
          role="button"
          tabIndex={0}
          onClick={this.onClick}
          onKeyDown={this.onKeyDown}
        >
          <div className="rc-sidebar-item-content">
            <span title={title} className="rc-sidebar-item-title">
              {title}
            </span>
          </div>
        </a>
      </li>
      /* eslint-enable jsx-a11y/anchor-is-valid */
    );
  }
}

SubsectionItem.propTypes = propTypes;
SubsectionItem.defaultProps = defaultProps;

export default SubsectionItem;
