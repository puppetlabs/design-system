import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Table from '../table/Table';

configure({ adapter: new Adapter() });

const data = [
  { id: 1, eventType: 'Virus/Malware', affectedDevices: 20, detections: 634 },
  {
    id: 2,
    eventType: 'Spyware/Grayware',
    affectedDevices: 20,
    detections: 634,
  },
  { id: 3, eventType: 'URL Filtering', affectedDevices: 15, detections: 598 },
  { id: 4, eventType: 'Web Reputation', affectedDevices: 15, detections: 598 },
  { id: 5, eventType: 'Network Virus', affectedDevices: 15, detections: 497 },
  {
    id: 6,
    eventType: 'Application Control',
    affectedDevices: 0,
    detections: 0,
  },
  {
    id: 7,
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

const wrapper = mount(
  <>
    <Table columns={columns} data={data} />
    <Table.TableFooter rowCountText="5 reports" />
  </>,
);

describe('Row Count', () => {
  test('Displays rowCountText correctly', () => {
    expect(wrapper.find('div.dg-table-row-count-footer').text()).toBe(
      '5 reports',
    );
  });
});

describe('Pagination', () => {
  const mockfunc = jest.fn();
  const wrapper2 = mount(
    <>
      <Table columns={columns} data={data} />
      <Table.TableFooter
        PageSelector
        currentPage={1}
        pageCount={2}
        updatePage={mockfunc}
      />
    </>,
  );
  test('Renders correct Pagination content', () => {
    expect(wrapper2.find('button.rc-page-selector-button').at(1).text()).toBe(
      '1',
    );

    expect(wrapper2.find('button.rc-page-selector-button').at(2).text()).toBe(
      '2',
    );
  });

  test('updatePage fires with button clicked', () => {
    wrapper2.find('button.rc-page-selector-button').at(1).simulate('click');
    wrapper2.find('button.rc-page-selector-button').at(2).simulate('click');
    wrapper2.find('button.rc-page-selector-button').at(3).simulate('click');
    expect(mockfunc).toHaveBeenCalledTimes(3);
  });
});

describe('Rows Per Page', () => {
  const mockfunc = jest.fn();
  const wrapper3 = mount(
    <>
      <Table columns={columns} data={data} />
      <Table.TableFooter
        rowCountText="5 reports"
        rowsPerPage
        rowsPerPageText="Your displaying"
        rowsPerPageValue={5}
        onRowPerPageSelect={mockfunc}
        PageSelector
        currentPage={1}
        pageCount={2}
        updatePage={() => {}}
      />
    </>,
  );

  test('Renders correct Rows Per Page action', () => {
    expect(wrapper3.find('div.dg-table-footer-rows-per-page-text').text()).toBe(
      'Your displaying:',
    );
    expect(
      wrapper3
        .find(
          '.dg-table-footer-rows-per-page-select button.rc-button span.rc-button-content',
        )
        .text(),
    ).toBe('5');
  });

  test('onRowPerPageSelect gets called on new row count select', () => {
    wrapper3
      .find(
        'div.dg-table-footer-rows-per-page-select button.rc-button-select-target',
      )
      .simulate('click');
    wrapper3.find('span.rc-menu-list-item-content').last().simulate('click');

    expect(mockfunc).toHaveBeenCalledWith(50);
  });
});
