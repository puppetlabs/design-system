import PropTypes from 'prop-types';
import React from 'react';
import Select from '../select/Select';

const propTypes = {
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  column: PropTypes.string,
  rowData: PropTypes.shape({}),
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  ),
  disabled: PropTypes.bool,
};

const defaultProps = {
  data: null,
  onChange: null,
  column: null,
  rowData: null,
  options: [],
  disabled: false,
};

class ColumnSelect extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(id) {
    const { rowData, column, onChange } = this.props;
    const newRowData = rowData;

    newRowData[column] = id;

    if (onChange) {
      onChange(newRowData);
    }
  }

  render() {
    const { options, data, disabled } = this.props;

    return (
      <Select
        options={options}
        value={data}
        onChange={this.onChange}
        disabled={disabled}
      />
    );
  }
}

ColumnSelect.propTypes = propTypes;
ColumnSelect.defaultProps = defaultProps;

export default ColumnSelect;
