import React from 'react';
import StyleguideSection from './partials/StyleguideSection';
import Table from '../library/table/Table';
import ColumnSelect from '../library/table/ColumnSelect';
import ColumnInput from '../library/table/ColumnInput';

const stripedData = [{
  text: 'Happy striped table text',
  select: 'Happy Select',
  input: 'We are happy striped inputs',
  meta: { selected: true, column: '', id: 1 },
  order: 1,
}, {
  text: 'More happy striped table text',
  select: 'Happy Select',
  input: 'We are happy striped inputs',
  meta: { selected: true, column: '', id: 2 },
  order: 2,
}, {
  text: 'Even more happy striped table text',
  select: 'Happy Select',
  input: 'We are happy striped inputs',
  meta: { selected: true, column: '', id: 3 },
  order: 3,
}];

const listData = [{
  text: 'Happy list table text',
  select: 'Happy Select',
  input: 'We are happy list inputs',
  meta: { selected: true, column: '', id: 4 },
  order: 1,
}, {
  text: 'More happy list table text',
  select: 'Happy Select',
  input: 'We are happy list inputs',
  meta: { selected: true, column: '', id: 5 },
  order: 2,
}, {
  text: 'Even more happy list table text',
  select: 'Happy Select',
  input: 'We are happy list inputs',
  meta: { selected: true, column: '', id: 6 },
  order: 3,
}];

const columns = [{
  column: 'text',
  displayName: 'text',
  order: 1,
}, {
  column: 'select',
  displayName: 'Select',
  order: 2,
  component: ColumnSelect,
  options: [
    { value: 'metric', label: 'Metric' },
    { value: 'dimension', label: 'Dimension' },
  ],
}, {
  column: 'input',
  displayName: 'Input',
  order: 2,
  component: ColumnInput,
}];

const updateData = (rowData, oldData) => {
  const newData = [];

  oldData.forEach((datum) => {
    if (rowData.meta.id === datum.meta.id) {
      datum.input = rowData.input;
    }
    newData.push(datum);
  });

  return newData;
};

class Tables extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      listData,
      stripedData,
    };

    this.onListChange = this.onListChange.bind(this);
    this.onStripedChange = this.onStripedChange.bind(this);
  }

  onListChange(rowData) {
    const updatedData = updateData(rowData, this.state.listData);

    this.setState({ listData: updatedData });
  }

  onStripedChange(rowData) {
    const updatedData = updateData(rowData, this.state.stripedData);

    this.setState({ stripedData: updatedData });
  }

  render() {
    return (
      <div>
        <h1>Tables</h1>
        <StyleguideSection title="Basic Table">
          <Table
            selectable
            striped
            data={ this.state.stripedData }
            columns={ columns }
            onChange={ this.onStripedChange }
          />
        </StyleguideSection>
      </div>
    );
  }
}

export default Tables;
