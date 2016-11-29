import React from 'React';
import classnames from 'classnames';
import Icon from './Icon';

const propTypes = {
  id: React.PropTypes.number,
  children: React.PropTypes.string,
  onRemove: React.PropTypes.func,
  onEdit: React.PropTypes.func,
};

class ListItem extends React.Component {

  constructor(props) {
    super(props);

    this.onRemove = this.onRemove.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  onRemove(e) {
    e.preventDefault();

    if (this.props.onRemove) {
      this.props.onRemove(this.props.id);
    }
  }

  onEdit(e) {
    e.preventDefault();

    if (this.props.onEdit) {
      this.props.onEdit(this.props.id);
    }
  }

  renderRemove() {
    let jsx;

    if (this.props.onRemove) {
      jsx = <a href="#/remove" onClick={ this.onRemove }><Icon type="delete" /></a>;
    }

    return jsx;
  }

  renderEdit() {
    let jsx;

    if (this.props.onEdit) {
      jsx = <a href="#/edit" onClick={ this.onEdit }><Icon type="edit" /></a>;
    }

    return jsx;
  }

  render() {
    const className = classnames('rc-list-item');
    const edit = this.renderEdit();
    const remove = this.renderRemove();

    return (
      <li className={ className }>
        { this.props.children }
        { edit }
        { remove }
      </li>
    );
  }
}

ListItem.propTypes = propTypes;

export default ListItem;
