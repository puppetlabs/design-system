import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../logo';

const propTypes = {
  as: PropTypes.elementType,
  minimized: PropTypes.bool,
  logo: PropTypes.string,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string.isRequired,
};

const defaultProps = {
  as: 'button',
  minimized: false,
  logo: '',
  onClick() {},
};

class SidebarHeader extends React.Component {
  renderLogo() {
    const { logo, minimized } = this.props;
    let jsx;

    if (logo) {
      jsx = (
        <Logo
          inverted
          expanded
          product={logo}
          type={minimized ? 'bug' : 'full'}
        />
      );
    }

    return jsx;
  }

  render() {
    const { as, minimized, ariaLabel, ...rest } = this.props;
    const logo = this.renderLogo();
    const Component = as;

    return (
      <Component className="rc-sidebar-header" {...rest} aria-label={ariaLabel}>
        {logo}
      </Component>
    );
  }
}

SidebarHeader.propTypes = propTypes;
SidebarHeader.defaultProps = defaultProps;

export default SidebarHeader;
