import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../logo';

const propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  minimized: PropTypes.bool,
  logo: PropTypes.string,
  onClick: PropTypes.func,
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
    const { as, minimized, ...rest } = this.props;
    const logo = this.renderLogo();
    const Component = as;

    return (
      <Component className="rc-sidebar-header" {...rest}>
        {logo}
      </Component>
    );
  }
}

SidebarHeader.propTypes = propTypes;
SidebarHeader.defaultProps = defaultProps;

export default SidebarHeader;
