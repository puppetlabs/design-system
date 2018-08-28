import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  column: PropTypes.shape({}),
  onClick: PropTypes.func,
};

const defaultProps = {
  column: null,
  onClick: null,
};

class ColumnHeader extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    const { onClick, column } = this.props;
    e.preventDefault();

    if (onClick) {
      onClick(column);
    }
  }

  render() {
    const { column } = this.props;
    const title = column.displayName || column.column;
    const metaData = column;
    const className = classnames(
      'rc-table-header rc-table-header-sortable',
      metaData.className,
    );

    // The inner divs seen below are currently used for sticky headers.
    // Eventually i think we moved to div based tables to reduce these
    // types of hacks. For now please don't remove.
    return (
      <th onClick={this.onClick} className={className}>
        {title}
        <div>{title}</div>
      </th>
    );
  }
}

ColumnHeader.propTypes = propTypes;
ColumnHeader.defaultProps = defaultProps;

export default ColumnHeader;
