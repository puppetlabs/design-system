import React from 'react';
import Select from '../select/Select';

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

const defaultProps = {
  options: [],
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
    const options = this.props.options.map((option) => {
      if (this.props.data === option.value) {
        option.selected = true;
      }

      return option;
    });

    return (
      <Select
        options={ options }
        onSelect={ this.onChange }
        disabled={ this.props.disabled }
      />
    );
  }
}

ColumnSelect.propTypes = propTypes;
ColumnSelect.defaultProps = defaultProps;

export default ColumnSelect;
