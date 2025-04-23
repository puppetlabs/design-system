import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../logo';

const propTypes = {
  ariaLabel: PropTypes.string,
  as: PropTypes.elementType,
  logo: PropTypes.string,
  minimized: PropTypes.bool,
  onClick: PropTypes.func,
};

const defaultProps = {
  ariaLabel: 'Return to home',
  as: 'button',
  logo: '',
  minimized: false,
  onClick() {},
};

class SidebarHeader extends React.Component {
  renderLogo() {
    const { logo, minimized } = this.props;
    let jsx;

    if (logo) {
      jsx = <Logo expanded product={logo} type={minimized ? 'bug' : 'full'} />;
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
