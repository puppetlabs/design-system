import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Table from '../table/Table';

configure({ adapter: new Adapter() });

const data = [
  { id: 0, eventType: 'Virus/Malware', affectedDevices: 20, detections: 634 },
  {
    id: 1,
    eventType: 'Spyware/Grayware',
    affectedDevices: 20,
    detections: 634,
  },
  { id: 2, eventType: 'URL Filtering', affectedDevices: 15, detections: 598 },
  { id: 3, eventType: 'Web Reputation', affectedDevices: 15, detections: 598 },
  { id: 4, eventType: 'Network Virus', affectedDevices: 15, detections: 497 },
  {
    id: 5,
    eventType: 'Application Control',
    affectedDevices: 0,
    detections: 0,
  },
  {
    id: 6,
    eventType: 'Application Control',
    affectedDevices: 0,
    detections: 0,
  },
];

const columns = [
  {
    label: 'Event Type',
    dataKey: 'eventType',
    className: 'testColumnClassName',
  },
  {
    label: 'Affected Devices',
    dataKey: 'affectedDevices',
    className: 'testColumnClassName',
  },
  {
    label: 'Detections',
    dataKey: 'detections',
    className: 'testColumnClassName',
  },
  {
    label: 'Linked field',
    dataKey: 'Link',
    className: 'testColumnClassName',
  },
];

const sortedColumns = [
  {
    label: 'Event Type',
    dataKey: 'eventType',
    className: 'testColumnClassName',
    sortable: true,
  },
  {
    label: 'Affected Devices',
    dataKey: 'affectedDevices',
    className: 'testColumnClassName',
    sortable: true,
  },
  {
    label: 'Detections',
    dataKey: 'detections',
    className: 'testColumnClassName',
    sortable: true,
  },
  {
    label: 'Linked field',
    dataKey: 'Link',
    className: 'testColumnClassName',
    sortable: true,
  },
];

const wrapper = mount(<Table columns={columns} data={data} />);
const wrapper2 = <Table columns={columns} />;
const wrapper3 = mount(<Table columns={columns} data={[]} />);
const wrapper4 = mount(<Table columns={sortedColumns} data={data} />);
const wrapper6 = mount(
  <Table columns={columns} data={data} rowClassName="testRowClassName" />,
);
const wrapper7 = mount(<Table columns={columns} data={data} loading />);

describe('Snapshot test', () => {
  test('Check component matches previous HTML snapshot', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper3).toMatchSnapshot();
  });
});

describe('Data Prop', () => {
  test('Check data prop default value', () => {
    const props = mount(wrapper2).props();
    expect(props.data).toEqual([]);
  });

  test('Empty array should render empty state', () => {
    expect(
      wrapper3
        .find('div.dg-empty-state-container')
        .hasClass('dg-empty-state-container'),
    ).toEqual(true);
  });

  test('that when table is loading it renders loading state', () => {
    expect(
      wrapper7
        .find('div.dg-table-loading-inner-container')
        .hasClass('dg-table-loading-inner-container'),
    ).toEqual(true);
  });

  test('Table should render correct number of rows', () => {
    expect(wrapper.find('tr.dg-table-row')).toHaveLength(7);
  });

  test('Data values should render in correct column', () => {
    expect(
      wrapper
        .find('tr.dg-table-row-0')
        .contains(<td className="rc-table-cell">Virus/Malware</td>),
    );
    expect(
      wrapper
        .find('tr.dg-table-row-0')
        .contains(<td className="rc-table-cell">20</td>),
    );
    expect(
      wrapper
        .find('tr.dg-table-row-0')
        .contains(<td className="rc-table-cell">634</td>),
    );
  });
});

describe('Column Prop', () => {
  test('All columns render', () => {
    expect(wrapper.find('tr.rc-table-header').children()).toHaveLength(4);
  });

  test('Correct labels displayed / Columns render in correct order', () => {
    expect(wrapper.find('tr.rc-table-header').childAt(0).text()).toBe(
      columns[0].label,
    );

    expect(wrapper.find('tr.rc-table-header').childAt(1).text()).toBe(
      columns[1].label,
    );

    expect(wrapper.find('tr.rc-table-header').childAt(2).text()).toBe(
      columns[2].label,
    );

    expect(wrapper.find('tr.rc-table-header').childAt(3).text()).toBe(
      columns[3].label,
    );
  });

  const data2 = [
    {
      eventType: 'Virus/Malware',
      eventResults: { affectedDevices: 20, detections: 600, unique: 40 },
    },
  ];

  const columns2 = [
    {
      label: 'Event Type1',
      dataKey: 'eventType',
    },
    {
      label: 'Affected Devices',
      dataKey: 'eventResults.affectedDevices',
    },
    { label: 'Detections', dataKey: 'eventResults.detections' },
    { label: 'Linked field', dataKey: 'eventResults.unique' },
  ];

  const wrapper8 = mount(<Table data={data2} columns={columns2} />);

  test('Customs can collect data with dataKey paths', () => {
    expect(wrapper8.find('td.rc-table-cell').at(2).text()).toEqual('600');
  });
});

describe('Sortable Props', () => {
  const mockfunc = jest.fn();
  const sortedState = { direction: 'asc', sortDataKey: 'eventType' };
  const wrapper5 = mount(
    <Table
      columns={sortedColumns}
      data={data}
      onSort={mockfunc}
      sortedColumn={sortedState}
    />,
  );

  test('When sortable prop is true header icons render ', () => {
    expect(wrapper4.find('.rc-icon-increment')).toHaveLength(columns.length);
  });

  test('SortedColumn renders correctly', () => {
    expect(
      wrapper5
        .find('.rc-table-header')
        .children()
        .exists('.dg-column-header-label-active'),
    ).toBe(true);
  });
});

describe('Custom classes', () => {
  const rowMockfunc = jest.fn();
  const columnMockfunc = jest.fn();
  // eslint-disable-next-line
  const wrapper7 = mount(
    <Table
      columns={columns.map((x) => ({
        ...x,
        className: () => columnMockfunc(),
      }))}
      data={data}
      rowClassName={rowMockfunc}
    />,
  );

  test('Custom row classname of string is rendered', () => {
    wrapper6.find('tr.dg-table-row').forEach((node) => {
      expect(node.hasClass('testRowClassName')).toEqual(true);
    });
  });

  test('Custom row classname of function is called', () => {
    expect(rowMockfunc).toHaveBeenCalledTimes(7);
  });

  test('Custom column classname of string is rendered', () => {
    wrapper6.find('td.rc-table-cell').forEach((node) => {
      expect(node.hasClass('testColumnClassName')).toEqual(true);
    });
  });

  test('Custom column classname of function is called', () => {
    expect(columnMockfunc).toHaveBeenCalledTimes(28);
  });
});

describe('Selection Props', () => {
  const rowCheckMockfunc = jest.fn();
  const rowClickMockfunc = jest.fn();
  const wrapper9 = mount(
    <Table
      columns={columns}
      data={data}
      selectable
      onRowChecked={rowCheckMockfunc}
      onRowClick={rowClickMockfunc}
    />,
  );

  test('When selectable prop passed table renders correctly', () => {
    expect(
      wrapper9
        .find('.dg-table-header-checkbox')
        .first()
        .parent()
        .is('th.dg-table-header-checkbox-container'),
    ).toEqual(true);
  });
  expect(wrapper9.findWhere((n) => n.name() === 'Checkbox')).toHaveLength(8);

  test('When row checkbox is clicked fire onUpdateData', () => {
    wrapper9.find('.rc-checkbox').last().simulate('change');
    expect(rowCheckMockfunc).toHaveBeenCalled();
  });

  test('When property `selected` is true in data prop object table row cells are rendered correctly', () => {
    const data3 = [
      {
        eventType: 'Virus/Malware',
        eventResults: { affectedDevices: 20, detections: 600, unique: 40 },
        selected: true,
      },
    ];

    const columns3 = [
      {
        label: 'Event Type1',
        dataKey: 'eventType',
      },
      {
        label: 'Affected Devices',
        dataKey: 'eventResults.affectedDevices',
      },
      { label: 'Detections', dataKey: 'eventResults.detections' },
      { label: 'Linked field', dataKey: 'eventResults.unique' },
    ];

    const wrapper11 = mount(
      <Table data={data3} columns={columns3} selectable />,
    );
    expect(wrapper11.find('.rc-checkbox').last().prop('checked')).toEqual(true);
  });

  test('When row is clicked fire onRowClick', () => {
    wrapper9.find('.dg-table-row').first().simulate('click');

    expect(rowClickMockfunc).toHaveBeenCalledWith(undefined, 0, {
      affectedDevices: 20,
      detections: 634,
      eventType: 'Virus/Malware',
      id: 0,
    });
  });
});
