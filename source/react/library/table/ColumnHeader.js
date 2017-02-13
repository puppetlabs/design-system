import classnames from 'classnames';
import React from 'react';

const propTypes = {
  column: React.PropTypes.object,
  onClick: React.PropTypes.func,
};

class ColumnHeader extends React.Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();

    if (this.props.onClick) {
      this.props.onClick(this.props.column);
    }
  }

  render() {
    const title = this.props.column.displayName || this.props.column.column;
    const metaData = this.props.column;
    const className = classnames('rc-table-header rc-table-header-sortable', metaData.className);

    // The inner divs seen below are currently used for sticky headers.
    // Eventually i think we moved to div based tables to reduce these
    // types of hacks. For now please don't remove.
    return (
      <th onClick={ this.onClick } className={ className }>{ title }<div>{ title }</div></th>
    );
  }
}

ColumnHeader.propTypes = propTypes;

export default ColumnHeader;
