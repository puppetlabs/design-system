import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const propTypes = {
  title: PropTypes.any,
  /** Transcends Sidebar to correctly set active states */
  onClick: PropTypes.func,
  /** Easy prop for setting default selected option */
  default: PropTypes.bool,
  /** The title of the active option */
  selected: PropTypes.string,
};

const defaultProps = {
  title: '',
  onClick: () => {},
  default: false,
  selected: null,
};

class SubsectionItem extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    // Load default option
    if (this.props.default) {
      this.props.onClick(this.props.title);
    }
  }

  onClick(e, title) {
    e.preventDefault();

    if (this.props.onClick) {
      this.props.onClick(title);
    }
  }

  render() {
    const active = this.props.title === this.props.selected;
    const className = classnames('rc-sidebar-subsection-item', {
      'rc-sidebar-subsection-item-selected': active,
    });

    return (
      <li className={ className }>
        <a className="rc-sidebar-subsection-link" role="button" tabIndex={ 0 } onClick={ e => this.onClick(e, this.props.title) }>
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
