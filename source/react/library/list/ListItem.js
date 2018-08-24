import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Icon from '../icon/Icon';
import { TooltipHoverArea } from '../tooltips/Tooltip';

const propTypes = {
  size: PropTypes.oneOf(['tiny', 'small', 'medium']),
  className: PropTypes.string,
  actions: PropTypes.node,
  kebab: PropTypes.node,
  onRemove: PropTypes.func,
  onEdit: PropTypes.func,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  tooltip: PropTypes.bool,
  children: PropTypes.node,
  fancy: PropTypes.bool,
};

const defaultProps = {
  tooltip: false,
  size: 'small',
  className: '',
  actions: null,
  kebab: null,
  selected: false,
  fancy: false,
  onRemove: null,
  onEdit: null,
  onClick: null,
  children: null,
};

/**
 * `ListItem` renders an item in a list.
 */
class ListItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onRemove = this.onRemove.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  onClick(e) {
    const { onClick, selected } = this.props;

    if (e) {
      e.preventDefault();
    }

    if (onClick) {
      onClick(!selected);
    }
  }

  onRemove(e) {
    const { onRemove } = this.props;
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (onRemove) {
      onRemove();
    }
  }

  onEdit(e) {
    const { onEdit } = this.props;
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (onEdit) {
      onEdit();
    }
  }

  getIconSize() {
    const { size } = this.props;
    let iconSize = '12px';

    if (size === 'tiny') {
      iconSize = '10px';
    }

    return iconSize;
  }

  renderRemove() {
    const { onRemove } = this.props;
    const iconSize = this.getIconSize();
    let jsx;

    // TODO: This should render a button element or an anchor if its for navigation
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/anchor-is-valid */
    if (onRemove) {
      jsx = (
        <a
          role="button"
          tabIndex={0}
          className="rc-list-item-action rc-list-item-remove"
          onClick={this.onRemove}
        >
          <Icon type="close" width={iconSize} height={iconSize} />
        </a>
      );
    }
    /* eslint-enable */

    return jsx;
  }

  renderEdit() {
    const { onEdit } = this.props;
    const iconSize = this.getIconSize();
    let jsx;

    // TODO: This should render a button element or an anchor if its for navigation
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/anchor-is-valid */
    if (onEdit) {
      jsx = (
        <a
          role="button"
          tabIndex={0}
          className="rc-list-item-action rc-list-item-edit rc-list-item-hidden"
          onClick={this.onEdit}
        >
          <Icon type="pencil" width={iconSize} height={iconSize} />
        </a>
      );
    }
    /* eslint-enable */

    return jsx;
  }

  renderKebab() {
    const { kebab } = this.props;
    let jsx;

    if (kebab) {
      jsx = (
        <div className="rc-list-item-action rc-list-item-kebab">{kebab}</div>
      );
    }

    return jsx;
  }

  render() {
    const {
      size,
      className,
      onClick,
      selected,
      kebab,
      fancy,
      actions,
      children,
      tooltip,
    } = this.props;

    const newClassName = classnames(
      'rc-list-item',
      className,
      `rc-list-item-${size}`,
      {
        'rc-list-item-clickable': onClick,
        'rc-list-item-selected': selected,
        'rc-list-item-kebab': kebab,
        'rc-list-item-fancy': fancy,
      },
    );

    const edit = this.renderEdit();
    const remove = this.renderRemove();
    const content = children;

    const props = {
      className: classnames('rc-list-item-link', {
        'rc-list-item-link-fancy': fancy,
      }),
    };

    if (this.onClick) {
      props.onClick = this.onClick;
      props.role = 'button';
    }

    let jsx = (
      <div {...props}>
        {this.renderKebab()}
        <span className="rc-list-item-text">{content}</span>
        <span className="rc-list-item-actions">
          {actions}
          {edit}
          {remove}
        </span>
      </div>
    );

    if (tooltip) {
      jsx = (
        <TooltipHoverArea anchor="bottom" tooltip={content}>
          {jsx}
        </TooltipHoverArea>
      );
    }

    return <li className={newClassName}>{jsx}</li>;
  }
}

ListItem.propTypes = propTypes;
ListItem.defaultProps = defaultProps;

export default ListItem;
