import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {
  onSectionClick: PropTypes.func,
  pageSections: PropTypes.array,
};

const defaultProps = {
  pageSections: [],
  onSectionClick: () => {},
};

class Pagenav extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onSectionClick = this.onSectionClick.bind(this);

    this.state = { menuOpen: false };
  }

  onClick() {
    if (this.props.onSectionClick) {
      this.props.onSectionClick();
    }
  }

  onSectionClick(key) {
    this.setState({ menuOpen: false });

    this.props.onSectionClick(key);
  }

  getPagenavLeft() {
    const pageSections = this.props.pageSections;

    const sections = pageSections.map((section) => {
      const className = classnames('rc-pagenav-link', {
        'rc-pagenav-link-active': section.active,
      });

      return (
        <a className={ className } role="button" tabIndex={ 0 } onClick={ this.onClick }>
          { section.label }
        </a>
      );
    });

    return (
      <div className="rc-pagenav-left">
        { sections }
      </div>
    );
  }

  getPagenavRight() {

    // return (
    //   <div className="rc-pagenav-right">
    //     ...
    //   </div>
    // );
  }

  render() {
    const pagenavLeft = this.getPagenavLeft();
    const pagenavRight = this.getPagenavRight();

    return (
      <div className="rc-pagenav">
        { pagenavLeft }
        { pagenavRight }
      </div>
    );
  }
}

Pagenav.propTypes = propTypes;
Pagenav.defaultProps = defaultProps;

export default Pagenav;
