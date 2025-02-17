import React from 'react';
import { Link } from '@puppet/react-components';

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i += 1) {
    arr.push(i);
  }
  return arr;
};

const newRow = () => ({
  eventType: 'hello',
  affectedDevices: 'world',
  detections: Math.floor(Math.random() * 30),
  Link: <Link href="https://puppet.com/products/puppet-remediate">cat</Link>,
  unique: Math.floor(Math.random() * 100),
  selected: false,
});

export default function makeData(len = 200) {
  return range(len).map(() => ({
    ...newRow(),
    children: range(10).map(newRow),
  }));
}
