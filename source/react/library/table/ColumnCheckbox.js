import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  column: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  rowData: PropTypes.shape({}),
};

const defaultProps = {
  column: '',
  checked: false,
  rowData: {},
  onChange: null,
};

class ColumnCheckbox extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { rowData, column, onChange } = this.props;
    const newRowData = rowData;

    if (column) {
      newRowData[column] = e.target.checked;
    }

    if (onChange) {
      onChange(newRowData, e.target.checked);
    }
  }

  render() {
    const { checked } = this.props;

    return (
      <input
        type="checkbox"
        defaultChecked={checked}
        onChange={this.onChange}
      />
    );
  }
}

ColumnCheckbox.propTypes = propTypes;
ColumnCheckbox.defaultProps = defaultProps;

export default ColumnCheckbox;
