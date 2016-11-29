import React from 'React';
import classnames from 'classnames';
import Icon from './Icon';

const propTypes = {
  id: React.PropTypes.number,
  children: React.PropTypes.string,
  onRemove: React.PropTypes.func,
  onEdit: React.PropTypes.func,
  onClick: React.PropTypes.func,
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
      this.props.onClick();
    }
  }

  onRemove(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.props.onRemove) {
      this.props.onRemove(this.props.id);
    }
  }

  onEdit(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.props.onEdit) {
      this.props.onEdit(this.props.id);
    }
  }

  renderRemove() {
    let jsx;

    if (this.props.onRemove) {
      jsx = (
        <button className="rc-list-item-remove" onClick={ this.onRemove }>
          <Icon type="delete" />
        </button>
      );
    }

    return jsx;
  }

  renderEdit() {
    let jsx;

    if (this.props.onEdit) {
      jsx = (
        <button className="rc-list-item-edit" onClick={ this.onEdit }>
          <Icon type="edit" />
        </button>
      );
    }

    return jsx;
  }

  render() {
    const className = classnames('rc-list-item');
    const edit = this.renderEdit();
    const remove = this.renderRemove();

    return (
      <li className={ className }>
        <a href="/#/list-item-click" onClick={ this.onClick }>
          { this.props.children }
          { edit }
          { remove }
        </a>
      </li>
    );
  }
}

ListItem.propTypes = propTypes;

export default ListItem;
