import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import Table from './Table';
import './'

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
      Link: <Link>ghdfhgfdhgfdsgfhjgf</Link>,
    },
  ];
  
  const columns = [
    { label: 'Event Type', dataKey: 'eventType' },
    { label: 'Affected Devices', dataKey: 'affectedDevices' },
    { label: 'Detections', dataKey: 'detections' },
    { label: 'Linked field', dataKey: 'Link' },
  ];
  
  const rowCount = { count: '7', label: 'runs' };
  
  const sortFunction = (direction, dataKey) => {
    // sortable will return direction and dataKey on every sort action
    // This information can be used to carryout a sorting logic on your data and rerender the table
    console.log(direction, dataKey);
  };

  const wrapper = mount(
    <Table
      columns={columns}
      data={data}
    />,
  );

  describe('propType validation', () => {
    it('should accept a data prop that defaults to an empty array', () => {
      const component = mount(<Table columns={[]} />);

      expect(component)
        .to.have.prop('data')
        .that.eqls([]);
    });

  describe('content rendering', () => {
    it('should render no rows if there is no data', () => {
      wrapper.setProps({ data: [] });
      expect(wrapper).to.not.have.descendants('.body-row');
      wrapper.setProps({ data });
    });