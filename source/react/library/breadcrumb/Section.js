import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.any,
  link: PropTypes.bool,
  onClick: PropTypes.func,
  route: PropTypes.string,
};

const defaultProps = {
  link: false,
};

class BreadcrumbSection extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    const { onClick, link, route } = this.props;

    if (e) {
      e.preventDefault();
    }

    if (onClick && link) {
      onClick(route);
    }
  }

  render() {
    const { children, link, route } = this.props;
    const className = 'rc-breadcrumb-section';
    let jsx;

    if (link) {
      jsx = (
        <a href={route} className={className} onClick={this.onClick}>
          {children}
        </a>
      );
    } else {
      jsx = <div className={className}>{children}</div>;
    }

    return jsx;
  }
}

BreadcrumbSection.propTypes = propTypes;
BreadcrumbSection.defaultProps = defaultProps;

export default BreadcrumbSection;
