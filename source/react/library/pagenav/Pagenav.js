import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {
  onSectionClick: PropTypes.func,
  pageSections: PropTypes.array,
  actions: PropTypes.array,
  activeSection: PropTypes.string,
  fixed: PropTypes.bool,
};

const defaultProps = {
  pageSections: [],
  actions: [],
  onSectionClick: () => {},
  activeSection: null,
  fixed: false,
};

class Pagenav extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);

    this.state = { activeSection: props.activeSection };
  }

  componentWillReceiveProps(newProps) {
    if (this.props.activeSection !== newProps.activeSection) {
      this.setState({ activeSection: newProps.activeSection });
    }
  }

  onClick(e) {
    const activeSection = e.target.getAttribute('value');
    this.setState({ activeSection });

    if (document && document.getElementById(activeSection)) {
      document.getElementById(activeSection).scrollIntoView();
    }

    this.props.onSectionClick();
  }

  getPagenavLeft() {
    const pageSections = this.props.pageSections;
    const activeSection = this.state.activeSection;

    const sections = pageSections.map((section) => {
      const className = classnames('rc-pagenav-link', {
        'rc-pagenav-link-active': activeSection ? activeSection === section.id : section.active,
      });

      return (
        <a value={ section.id } key={ section.label } className={ className } role="button" tabIndex={ 0 } onClick={ this.onClick }>
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
    const actions = this.props.actions;

    return (
      <div className="rc-pagenav-right">
        { actions }
      </div>
    );
  }

  render() {
    const pagenavLeft = this.getPagenavLeft();
    const pagenavRight = this.getPagenavRight();

    const className = classnames('rc-pagenav', {
      'rc-pagenav-fixed': this.props.fixed,
    });

    return (
      <div className={ className }>
        { pagenavLeft }
        { pagenavRight }
      </div>
    );
  }
}

Pagenav.propTypes = propTypes;
Pagenav.defaultProps = defaultProps;

export default Pagenav;
