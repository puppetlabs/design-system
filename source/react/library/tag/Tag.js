import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Icon from '../icon/Icon';
import { TooltipHoverArea } from '../tooltips/Tooltip';
import { ENTER_KEY_CODE } from '../../constants';

const propTypes = {
  /** Selected state */
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  bold: PropTypes.bool,
  selected: PropTypes.bool,
  className: PropTypes.string,
  round: PropTypes.bool,
  size: PropTypes.oneOf(['tiny', 'small', 'medium']),
  block: PropTypes.bool,
  tooltip: PropTypes.bool,
  onRemove: PropTypes.func,
  actions: PropTypes.arrayOf(PropTypes.element),
  onClick: PropTypes.func,
  children: PropTypes.node,
};

const defaultProps = {
  primary: false,
  secondary: false,
  selected: false,
  round: false,
  className: '',
  size: 'small',
  block: false,
  actions: null,
  tooltip: false,
  onRemove: null,
  onClick: null,
  children: null,
  bold: false,
};

/**
 * `Tag` is used to repesent a removable, clickable item.
 */
class Tag extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onKeyDownRemove = this.onKeyDownRemove.bind(this);
  }

  onClick(e) {
    const { onClick } = this.props;
    e.preventDefault();

    if (onClick) {
      onClick(e);
    }
  }

  onKeyDownRemove(e) {
    if (e.keyCode === ENTER_KEY_CODE) {
      this.onRemove(e);
    }
  }

  onRemove(e) {
    const { onRemove } = this.props;
    e.preventDefault();
    e.stopPropagation();

    if (onRemove) {
      onRemove(e);
    }
  }

  renderContent() {
    const actions = this.renderActions();
    const { children, tooltip } = this.props;

    let jsx = (
      <div className="rc-tag-content">
        {children}
        {actions}
      </div>
    );

    if (tooltip) {
      jsx = (
        <TooltipHoverArea anchor="bottom" tooltip={jsx}>
          {jsx}
        </TooltipHoverArea>
      );
    }

    return jsx;
  }

  renderActions() {
    const { actions } = this.props;
    let jsx;

    if (actions) {
      jsx = <div className="rc-tag-actions">{actions}</div>;
    }

    return jsx;
  }

  renderRemoveButton() {
    const { onRemove } = this.props;
    let jsx;

    if (onRemove) {
      jsx = (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
          role="button"
          tabIndex="0"
          className="rc-tag-button rc-tag-remove-button"
          onClick={this.onRemove}
          onKeyDown={this.onKeyDownRemove}
        >
          <Icon type="close" size="tiny" />
        </a>
      );
    }

    return jsx;
  }

  render() {
    const {
      onRemove,
      onClick,
      primary,
      secondary,
      bold,
      selected,
      size,
      block,
      round,
      className,
    } = this.props;

    const classNames = classnames('rc-tag', className, {
      'rc-tag-primary': primary,
      'rc-tag-secondary': secondary,
      'rc-tag-bold': bold,
      'rc-tag-selected': selected,
      'rc-tag-selectable': onClick,
      'rc-tag-removable': onRemove,
      'rc-tag-block': block,
      'rc-tag-round': round,
      [`rc-tag-${size}`]: size,
    });

    const content = this.renderContent();
    const removeButton = this.renderRemoveButton();

    const props = {
      className: classNames,
    };

    if (onClick) {
      props.role = 'button';
      props.onClick = this.onClick;
    }

    return (
      <div {...props}>
        {content}
        {removeButton}
      </div>
    );
  }
}

Tag.propTypes = propTypes;
Tag.defaultProps = defaultProps;

export default Tag;
