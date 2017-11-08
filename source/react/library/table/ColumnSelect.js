import React from 'react';
import Select from '../Select';

const propTypes = {
  data: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  onChange: React.PropTypes.func,
  column: React.PropTypes.string,
  rowData: React.PropTypes.object,
  options: React.PropTypes.array,
  disabled: React.PropTypes.bool,
};

class ColumnSelect extends React.Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(id) {
    const newRowData = this.props.rowData;

    newRowData[this.props.column] = id;

    if (this.props.onChange) {
      this.props.onChange(newRowData);
    }
  }

  render() {
    let options = [];

    if (this.props.options) {
      options = this.props.options;
    }

    return (
      <Select
        className="Select-small"
        clearable={ false }
        value={ this.props.data }
        options={ options }
        onChange={ this.onChange }
        autoSize={ false }
        disabled={ this.props.disabled }
      />
    );
  }
}

ColumnSelect.propTypes = propTypes;

export default ColumnSelect;
