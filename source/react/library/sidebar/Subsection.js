import PropTypes from 'prop-types';
import React from 'react';
import { getKey } from '../../helpers/statics';

const propTypes = {
  children: PropTypes.any,
  title: PropTypes.any,
  /** The title of the active option */
  selected: PropTypes.string,
  /** Transcends Sidebar to correctly set active states */
  onClick: PropTypes.func,
  /** Boolean to truncate lists w/expand button */
  truncate: PropTypes.bool,
  /** Transcends Sidebar to correctly list options */
  onViewMore: PropTypes.func,
};

const defaultProps = {
  children: [],
  title: '',
  selected: null,
  onClick: () => {},
  truncate: false,
  onViewMore: () => {},
};

class Subsection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      truncate: props.truncate,
    };

    this.onClick = this.onClick.bind(this);
    this.onViewMore = this.onViewMore.bind(this);
  }

  onClick(title) {
    if (this.props.onClick) {
      this.props.onClick(title);
    }
  }

  onViewMore(e) {
    e.preventDefault();

    this.setState({ truncate: false });
  }

  getOptions() {
    let options = React.Children.map(this.props.children, (option, idx) => {
      const props = {
        key: getKey(option, idx),
        onClick: this.onClick,
        selected: this.props.selected,
      };

      return React.cloneElement(option, props);
    });

    if (this.state.truncate) {
      const jsx = <a className="rc-sidebar-view-more-link" role="button" tabIndex={ 0 } onClick={ this.onViewMore }>View All...</a>;

      options = options.slice(0, 3);
      options.push(jsx);
    }

    return options;
  }

  render() {
    const options = this.getOptions();

    return (
      <div className="rc-sidebar-subsection">
        <div className="rc-sidebar-subsection-header">
          <span className="rc-sidebar-subsection-title">
            { this.props.title }
          </span>
          { /* add in optional button */ }
        </div>
        <div className="rc-sidebar-subsection-items">
          { options }
        </div>
      </div>
    );
  }
}

Subsection.propTypes = propTypes;
Subsection.defaultProps = defaultProps;

export default Subsection;
