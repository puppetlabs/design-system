import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  column: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  rowData: PropTypes.object,
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
ColumnCheckbox.defaultProps = defaultProps;

export default ColumnCheckbox;
