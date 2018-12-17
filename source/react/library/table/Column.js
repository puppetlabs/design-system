import clone from 'clone';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  component: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.any,
  rowData: PropTypes.shape({}),
};

const defaultProps = {
  component: null,
  data: null,
  rowData: {},
};

class Column extends React.Component {
  render() {
    const { data, component, rowData } = this.props;
    const props = clone(this.props);
    let elem;

    if (rowData.meta && rowData.meta.disabled) {
      props.disabled = rowData.meta.disabled;
    }

    if (component) {
      elem = React.createElement(component, props);
    } else {
      elem = <span title={data}>{data}</span>;
    }

    return elem;
  }
}

Column.propTypes = propTypes;
Column.defaultProps = defaultProps;

export default Column;
