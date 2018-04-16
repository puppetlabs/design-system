import PropTypes from 'prop-types';
import React from 'react';
import Select from '../select/Select';

const propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
  column: PropTypes.string,
  rowData: PropTypes.object,
  options: PropTypes.array,
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
