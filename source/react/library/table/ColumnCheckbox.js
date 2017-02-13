import React from 'react';

const propTypes = {
  column: React.PropTypes.string,
  checked: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  rowData: React.PropTypes.object,
};

class ColumnCheckbox extends React.Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const newRowData = this.props.rowData;

    if (this.props.column) {
      newRowData[this.props.column] = e.target.checked;
    }

    if (this.props.onChange) {
      this.props.onChange(newRowData, e.target.checked);
    }
  }

  render() {
    return (
      <input
        type="checkbox"
        defaultChecked={ this.props.checked }
        onChange={ this.onChange }
      />
    );
  }
}

ColumnCheckbox.propTypes = propTypes;

export default ColumnCheckbox;
