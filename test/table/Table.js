import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import React from 'react';

import Table from '../../source/react/library/table/Table';

describe('<Table />', () => {
  jsdom({ skipWindowCheck: true });

  const data = [
    { id: 1, name: 'Name 1', nested: { field: 'Field 1' } },
    { id: 2, name: 'Name 2', nested: { field: 'Field 2' } },
  ];

  const columns = [
    {
      label: 'Name',
      dataKey: 'name',
      className: 'column-name',
      style: { color: 'green' },
    },
    {
      label: 'Field',
      dataKey: 'field',
      cellDataGetter: ({ rowData }) => rowData.nested.field,
      className: 'column-field',
      style: { color: 'blue' },
    },
  ];

  it('propagates className to inner element', () => {
    expect(
      shallow(<Table data={data} columns={columns} className="test-class" />),
    ).to.have.className('test-class');
  });

  it('propagates inline style to inner element', () => {
    expect(
      shallow(
        <Table data={data} columns={columns} style={{ marginTop: 10 }} />,
      ),
    ).to.have.style('margin-top', '10px');
  });

  it('renders appropriate column labels', () => {
    expect(
      shallow(<Table data={data} columns={columns} />)
        .find('th')
        .first(),
    ).to.have.text('Name');

    expect(
      shallow(<Table data={data} columns={columns} />)
        .find('th')
        .last(),
    ).to.have.text('Field');
  });

  it('Applies column className to each header cell', () => {
    expect(
      shallow(<Table data={data} columns={columns} />)
        .find('th')
        .first(),
    ).to.have.className('column-name');

    expect(
      shallow(<Table data={data} columns={columns} />)
        .find('th')
        .last(),
    ).to.have.className('column-field');
  });

  it('Applies column inline style to each header cell', () => {
    expect(
      shallow(<Table data={data} columns={columns} />)
        .find('th')
        .first(),
    ).to.have.style('color', 'green');

    expect(
      shallow(<Table data={data} columns={columns} />)
        .find('th')
        .last(),
    ).to.have.style('color', 'blue');
  });

  it('Renders appropriate data in each cell', () => {
    expect(
      shallow(<Table data={data} columns={columns} />)
        .find('tbody tr')
        .first()
        .find('td')
        .first(),
    ).to.have.text('Name 1');

    expect(
      shallow(<Table data={data} columns={columns} />)
        .find('tbody tr')
        .last()
        .find('td')
        .first(),
    ).to.have.text('Name 2');

    expect(
      shallow(<Table data={data} columns={columns} />)
        .find('tbody tr')
        .first()
        .find('td')
        .last(),
    ).to.have.text('Field 1');

    expect(
      shallow(<Table data={data} columns={columns} />)
        .find('tbody tr')
        .last()
        .find('td')
        .last(),
    ).to.have.text('Field 2');
  });

  it('Passes the appropriate data to each cellDataGetter', () => {
    const cellDataGetter = sinon.spy();

    const testColumns = [
      {
        label: 'Field',
        dataKey: 'field',
        cellDataGetter,
        columnData: 'data',
      },
    ];

    shallow(<Table data={data} columns={testColumns} />);

    expect(cellDataGetter).to.have.been.calledWith({
      dataKey: 'field',
      rowData: data[0],
      columnData: 'data',
    });

    expect(cellDataGetter).to.have.been.calledWith({
      dataKey: 'field',
      rowData: data[1],
      columnData: 'data',
    });
  });

  it('Passes the appropriate data to each cellRenderer', () => {
    const cellRenderer = sinon.spy();

    const testColumns = [
      {
        label: 'Name',
        dataKey: 'name',
        cellRenderer,
        columnData: 'data',
      },
    ];

    shallow(<Table data={data} columns={testColumns} />);

    expect(cellRenderer).to.have.been.calledWith({
      cellData: 'Name 1',
      columnIndex: 0,
      dataKey: 'name',
      rowData: data[0],
      rowIndex: 0,
      columnData: 'data',
    });

    expect(cellRenderer).to.have.been.calledWith({
      cellData: 'Name 2',
      columnIndex: 0,
      dataKey: 'name',
      rowData: data[1],
      rowIndex: 1,
      columnData: 'data',
    });
  });
});
