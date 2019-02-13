import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Item from './Item';

const propTypes = {
  open: PropTypes.bool,
};

const defaultProps = {
  open: false,
};

class SidebarAccordion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: props.open,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();

    const { open } = this.state;
    this.setState({ open: !open });
  }

  render() {
    const { children, title, icon, count, badge } = this.props;
    const { open } = this.state;
    const accordionClassNames = classnames('rc-sidebar-accordion', {
      'rc-sidebar-accordion-open': open,
    });

    return (
      <Fragment>
        <Item
          open={open}
          accordion
          icon={icon}
          title={title}
          count={count}
          badge={badge}
          onClick={this.onClick}
        />
        <div className={accordionClassNames}>{children}</div>
      </Fragment>
    );
  }
}

SidebarAccordion.propTypes = propTypes;
SidebarAccordion.defaultProps = defaultProps;

export default SidebarAccordion;
