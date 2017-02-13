import clone from 'clone';
import React from 'react';

const propTypes = {
  component: React.PropTypes.func,
  data: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  column: React.PropTypes.string,
  onChange: React.PropTypes.func,
  rowData: React.PropTypes.object,
  disabled: React.PropTypes.bool,
};

class Column extends React.Component {

  render() {
    const { data, component, rowData } = this.props;
    const props = clone(this.props);
    let elem;

    if (rowData.meta && {}.hasOwnProperty.call(rowData.meta, 'disabled')) {
      props.disabled = rowData.meta.disabled;
    }

    if (component) {
      elem = React.createElement(component, props);
    } else {
      elem = <span title={ data }>{ data }</span>;
    }

    return elem;
  }
}

Column.propTypes = propTypes;

export default Column;
