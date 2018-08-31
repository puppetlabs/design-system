import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ENTER_KEY_CODE } from '../../constants';

const propTypes = {
  onSectionClick: PropTypes.func,
  pageSections: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      active: PropTypes.bool,
    }),
  ),
  actions: PropTypes.arrayOf(PropTypes.element),
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
    this.onKeyDown = this.onKeyDown.bind(this);

    this.state = { activeSection: props.activeSection };
  }

  componentWillReceiveProps(newProps) {
    const { activeSection } = this.props;

    if (activeSection !== newProps.activeSection) {
      this.setState({ activeSection: newProps.activeSection });
    }
  }

  onClick(e) {
    const { onSectionClick } = this.props;

    const activeSection = e.target.getAttribute('value');
    this.setState({ activeSection });

    if (document && document.getElementById(activeSection)) {
      document.getElementById(activeSection).scrollIntoView();
    }

    onSectionClick();
  }

  onKeyDown(e) {
    if (e.keyCode === ENTER_KEY_CODE) {
      this.onClick(e);
    }
  }

  getPagenavLeft() {
    const { pageSections } = this.props;
    const { activeSection } = this.state;

    const sections = pageSections.map(section => {
      const className = classnames('rc-pagenav-link', {
        'rc-pagenav-link-active': activeSection
          ? activeSection === section.id
          : section.active,
      });
      return (
        /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
        <a
          value={section.id}
          key={section.label}
          className={className}
          role="button"
          tabIndex={0}
          onClick={this.onClick}
          onKeyDown={this.onKeyDown}
        >
          {section.label}
        </a>
      );
    });

    return <div className="rc-pagenav-left">{sections}</div>;
  }

  getPagenavRight() {
    const { actions } = this.props;

    return <div className="rc-pagenav-right">{actions}</div>;
  }

  render() {
    const pagenavLeft = this.getPagenavLeft();
    const pagenavRight = this.getPagenavRight();
    const { fixed } = this.props;

    const className = classnames('rc-pagenav', {
      'rc-pagenav-fixed': fixed,
    });

    return (
      <div className={className}>
        {pagenavLeft}
        {pagenavRight}
      </div>
    );
  }
}

Pagenav.propTypes = propTypes;
Pagenav.defaultProps = defaultProps;

export default Pagenav;
