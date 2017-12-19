import React from 'react';
import classnames from 'classnames';
import Icon from '../Icon';
import { TooltipHoverArea } from '../tooltips/Tooltip';

const propTypes = {
  selected: React.PropTypes.bool,
  tooltip: React.PropTypes.string,
  onRemove: React.PropTypes.func,
  onEdit: React.PropTypes.func,
  onClick: React.PropTypes.func,
  children: React.PropTypes.string,
};

const defaultProps = {
  selected: false,
  tooltip: '',
  onRemove: null,
  onEdit: null,
  onClick: null,
  children: null,
};

/**
 * `ListItem` renders an item in a list.
 *
 * @example ../../../../docs/ListItem.md
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

  renderRemove() {
    let jsx;

    if (this.props.onRemove) {
      jsx = (
        <a
          role="button"
          tabIndex={ 0 }
          className="rc-list-item-action rc-list-item-remove"
          onClick={ this.onRemove }
        >
          <Icon type="delete" width="16px" height="16px" />
        </a>
      );
    }

    return jsx;
  }

  renderEdit() {
    let jsx;

    if (this.props.onEdit) {
      jsx = (
        <a
          role="button"
          tabIndex={ 0 }
          className="rc-list-item-action rc-list-item-edit"
          onClick={ this.onEdit }
        >
          <Icon type="edit" width="16px" height="16px" />
        </a>
      );
    }

    return jsx;
  }

  render() {
    const className = classnames('rc-list-item', {
      'rc-list-item-clickable': this.props.onClick,
      'rc-list-item-selected': this.props.selected,
    });
    const edit = this.renderEdit();
    const remove = this.renderRemove();
    const content = this.props.children;

    const props = {
      className: 'rc-list-item-link',
    };

    if (this.onClick) {
      props.onClick = this.onClick;
      props.role = 'button';
    }

    let jsx = (
      <div { ...props }>
        <span className="rc-list-item-text">
          { content }
        </span>
        <span className="rc-list-item-actions">
          { edit }
          { remove }
        </span>
      </div>
    );

    if (this.props.tooltip) {
      jsx = (
        <TooltipHoverArea anchor="bottom" tooltip={ content }>
          { jsx }
        </TooltipHoverArea>
      );
    }

    return (
      <li className={ className }>
        { jsx }
      </li>
    );
  }
}

ListItem.propTypes = propTypes;
ListItem.defaultProps = defaultProps;

export default ListItem;
