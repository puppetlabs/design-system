import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Item from './SidebarItem';

const propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  icon: PropTypes.string,
  count: PropTypes.number,
  children: PropTypes.node,
};

const defaultProps = {
  open: false,
  title: '',
  icon: '',
  count: null,
  children: [],
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
    const { children, title, icon, count } = this.props;
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
