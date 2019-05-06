It's a Table yo!

```
const data = [
  { id: 1, eventType: 'Virus/Malware', affectedDevices: 20, detections: 634 },
  { id: 2, eventType: 'Spyware/Grayware', affectedDevices: 20, detections: 634 },
  { id: 3, eventType: 'URL Filtering', affectedDevices: 15, detections: 598 },
  { id: 4, eventType: 'Web Reputation', affectedDevices: 15, detections: 598 },
  { id: 5, eventType: 'Network Virus', affectedDevices: 15, detections: 497 },
  { id: 6, eventType: 'Application Control', affectedDevices: 0, detections: 0 }
];

const columns = [
  { label: 'Event Type', dataKey: 'eventType' },
  { label: 'Affected Devices', dataKey: 'affectedDevices' },
  { label: 'Detections', dataKey: 'detections' }
];


<Table data={data} columns={columns} />

```
