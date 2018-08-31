import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import Icon from '../icon/Icon';
import { TooltipHoverArea } from '../tooltips/Tooltip';

const propTypes = {
  /** A string to identify the item visually for the user */
  title: PropTypes.string,
  /**
    Whether or not the children are displayed. Usually controlled by the parent
    `Accordion`
  */
  active: PropTypes.bool,
  /** Class name to apply to container */
  className: PropTypes.string,
  /** Callback for when the user opens the item */
  onOpen: PropTypes.func,
  children: PropTypes.node,
  /** Icon to render next to the title */
  icon: PropTypes.string,
  /** Tooltip to display on hover */
  tooltip: PropTypes.string,
};

const defaultProps = {
  title: '',
  icon: '',
  active: false,
  className: '',
  onOpen: () => {},
  children: null,
  tooltip: undefined,
};

/**
 * `AccordionItem`s are containers which are meant to be rendered within an
 * `Accordion`.
 */
class AccordionItem extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    const { onOpen } = this.props;

    if (e.nativeEvent) {
      e.nativeEvent.preventDefault();
    }

    if (onOpen) {
      onOpen();
    }
  }

  renderContent() {
    const { children } = this.props;

    return <div className="rc-accordion-item-content">{children}</div>;
  }

  renderTitle() {
    const { active, title, icon, tooltip } = this.props;
    const className = classnames('rc-accordion-item-header', {
      'rc-accordion-item-header-active': active,
    });
    let jsx = [];

    if (icon) {
      jsx.push(
        <span key="header-icon" className="rc-accordion-header-icon">
          <Icon width="16px" height="16px" type={icon} />
        </span>,
      );
    }

    jsx.push(
      <span key="header-title" className="rc-accordion-item-header-title">
        {title}
      </span>,
    );

    if (active) {
      jsx = <div className={className}>{jsx}</div>;
    } else {
      jsx.push(
        <span key="header-action" className="rc-accordion-item-header-action">
          <Icon width="10px" height="10px" type="plus" />
        </span>,
      );

      jsx = (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a className="rc-accordion-item-header" href="" onClick={this.onClick}>
          {jsx}
        </a>
      );
    }

    if (tooltip) {
      jsx = (
        <TooltipHoverArea tooltip={tooltip} anchor="bottom">
          {jsx}
        </TooltipHoverArea>
      );
    }

    return jsx;
  }

  render() {
    const { className, active } = this.props;
    const classNames = classnames(
      'rc-accordion-item',
      {
        'rc-accordion-item-active': active,
      },
      className,
    );
    const title = this.renderTitle();
    const content = this.renderContent();

    return (
      <div className={classNames}>
        {title}
        {content}
      </div>
    );
  }
}

AccordionItem.propTypes = propTypes;
AccordionItem.defaultProps = defaultProps;

export default AccordionItem;
