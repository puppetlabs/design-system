import PropTypes from 'prop-types';
import React from 'react';
import Input from '../input/Input';

const propTypes = {
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  column: PropTypes.string,
  onChange: PropTypes.func,
  rowData: PropTypes.shape({}),
  disabled: PropTypes.bool,
};

const defaultProps = {
  data: null,
  column: null,
  onChange: null,
  rowData: {},
  disabled: false,
};

class ColumnInput extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { rowData, column, onChange } = this.props;
    const newRowData = rowData;
    newRowData[column] = e.target.value;

    if (onChange) {
      onChange(newRowData);
    }
  }

  render() {
    const { data, disabled } = this.props;

    return (
      <Input
        type="text"
        size="small"
        value={data}
        onChange={this.onChange}
        disabled={disabled}
      />
    );
  }
}

ColumnInput.propTypes = propTypes;
ColumnInput.defaultProps = defaultProps;

export default ColumnInput;
