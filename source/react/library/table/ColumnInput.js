import React from 'react';
import Input from '../Input';

const propTypes = {
  data: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  column: React.PropTypes.string,
  onChange: React.PropTypes.func,
  rowData: React.PropTypes.object,
  disabled: React.PropTypes.bool,
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
    const newRowData = this.props.rowData;
    newRowData[this.props.column] = e.target.value;

    if (this.props.onChange) {
      this.props.onChange(newRowData);
    }
  }

  render() {
    return (
      <Input
        type="text"
        size="small"
        value={ this.props.data }
        onChange={ this.onChange }
        disabled={ this.props.disabled }
      />
    );
  }
}

ColumnInput.propTypes = propTypes;
ColumnInput.defaultProps = defaultProps;

export default ColumnInput;
