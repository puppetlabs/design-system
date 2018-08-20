import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Icon from '../icon/Icon';
import { TooltipHoverArea } from '../tooltips/Tooltip';

const propTypes = {
  size: PropTypes.oneOf(['tiny', 'small', 'medium']),
  className: PropTypes.string,
  actions: PropTypes.any,
  kebab: PropTypes.any,
  onRemove: PropTypes.func,
  onEdit: PropTypes.func,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  tooltip: PropTypes.bool,
  children: PropTypes.any,
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
    if (e) {
      e.preventDefault();
    }

    if (this.props.onClick) {
      this.props.onClick(!this.props.selected);
    }
  }

  onRemove(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (this.props.onRemove) {
      this.props.onRemove();
    }
  }

  onEdit(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (this.props.onEdit) {
      this.props.onEdit();
    }
  }

  getIconSize() {
    let iconSize = '12px';

    if (this.props.size === 'tiny') {
      iconSize = '10px';
    }

    return iconSize;
  }

  renderRemove() {
    const iconSize = this.getIconSize();
    let jsx;

    if (this.props.onRemove) {
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

    return jsx;
  }

  renderEdit() {
    const iconSize = this.getIconSize();
    let jsx;

    if (this.props.onEdit) {
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

    return jsx;
  }

  renderKebab() {
    let jsx;

    if (this.props.kebab) {
      jsx = (
        <div className="rc-list-item-action rc-list-item-kebab">
          {this.props.kebab}
        </div>
      );
    }

    return jsx;
  }

  render() {
    const size = this.props.size;
    const className = classnames(
      'rc-list-item',
      this.props.className,
      `rc-list-item-${size}`,
      {
        'rc-list-item-clickable': this.props.onClick,
        'rc-list-item-selected': this.props.selected,
        'rc-list-item-kebab': this.props.kebab,
        'rc-list-item-fancy': this.props.fancy,
      },
    );
    const edit = this.renderEdit();
    const kebab = this.renderKebab();
    const remove = this.renderRemove();
    const actions = this.props.actions;
    const content = this.props.children;

    const props = {
      className: classnames('rc-list-item-link', {
        'rc-list-item-link-fancy': this.props.fancy,
      }),
    };

    if (this.onClick) {
      props.onClick = this.onClick;
      props.role = 'button';
    }

    let jsx = (
      <div {...props}>
        {kebab}
        <span className="rc-list-item-text">{content}</span>
        <span className="rc-list-item-actions">
          {actions}
          {edit}
          {remove}
        </span>
      </div>
    );

    if (this.props.tooltip) {
      jsx = (
        <TooltipHoverArea anchor="bottom" tooltip={content}>
          {jsx}
        </TooltipHoverArea>
      );
    }

    return <li className={className}>{jsx}</li>;
  }
}

ListItem.propTypes = propTypes;
ListItem.defaultProps = defaultProps;

export default ListItem;
