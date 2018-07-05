import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const propTypes = {
  title: PropTypes.any,
  /** Transcends Sidebar to correctly set active states */
  onSubsectionClick: PropTypes.func,
  /** Easy prop for setting default selected option */
  default: PropTypes.bool,
  /** The title of the active option */
  selected: PropTypes.string,
};

const defaultProps = {
  title: '',
  onSubsectionClick: () => {},
  default: false,
  selected: null,
};

class SubsectionOption extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    // Load default option
    if (this.props.default) {
      this.props.onSubsectionClick(this.props.title);
    }
  }

  onClick(e, title) {
    e.preventDefault();

    if (this.props.onSubsectionClick) {
      this.props.onSubsectionClick(title);
    }
  }

  render() {
    const active = this.props.title === this.props.selected;
    const className = classnames('rc-sidebar-subsection-option', {
      'rc-sidebar-subsection-option-selected': active,
    });

    return (
      <li className={ className }>
        <a className="rc-sidebar-subsection-link" role="button" tabIndex={ 0 } onClick={ e => this.onClick(e, this.props.title) }>
          <div className="rc-sidebar-subsection-option-header">
            <span className="rc-sidebar-subsection-option-title">{ this.props.title }</span>
          </div>
        </a>
      </li>
    );
  }
}

SubsectionOption.propTypes = propTypes;
SubsectionOption.defaultProps = defaultProps;

export default SubsectionOption;
