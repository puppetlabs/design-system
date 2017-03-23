import React from 'react';
import classnames from 'classnames';
import Button from './Button';
import { TooltipHoverArea } from './tooltips/Tooltip';

const propTypes = {
  children: React.PropTypes.string,
  onRemove: React.PropTypes.func,
  onEdit: React.PropTypes.func,
  onClick: React.PropTypes.func,
  selected: React.PropTypes.bool,
  tooltip: React.PropTypes.bool,
};

const defaultProps = {
  selected: false,
};

class ListItem extends React.Component {

  constructor(props) {
    super(props);

    this.onRemove = this.onRemove.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  onClick(e) {
    e.preventDefault();

    if (this.props.onClick) {
      this.props.onClick(!this.props.selected);
    }
  }

  onRemove(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.props.onRemove) {
      this.props.onRemove();
    }
  }

  onEdit(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.props.onEdit) {
      this.props.onEdit();
    }
  }

  renderRemove() {
    let jsx;

    if (this.props.onRemove) {
      jsx = (
        <Button
          transparent
          className="rc-list-item-remove"
          type="button"
          size="small"
          icon="delete"
          onClick={ this.onRemove }
        />
      );
    }

    return jsx;
  }

  renderEdit() {
    let jsx;

    if (this.props.onEdit) {
      jsx = (
        <Button
          transparent
          className="rc-list-item-edit"
          type="button"
          size="small"
          icon="edit"
          onClick={ this.onEdit }
        />
      );
    }

    return jsx;
  }

  render() {
    const className = classnames('rc-list-item', { 'rc-list-item-selected': this.props.selected });
    const edit = this.renderEdit();
    const remove = this.renderRemove();
    const content = this.props.children;

    let jsx = (
      <a href="/#/list-item-click" className="rc-list-item-link" onClick={ this.onClick }>
        { content }
        { edit }
        { remove }
      </a>
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
