import namor from 'namor';
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
  eventType: namor.generate({ words: 1, numbers: 0 }),
  affectedDevices: namor.generate({ words: 1, numbers: 1 }),
  detections: Math.floor(Math.random() * 30),
  Link: (
    <Link href="https://puppet.com/products/puppet-remediate">
      {namor.generate({ words: 1, numbers: 1 })}
    </Link>
  ),
  unique: Math.floor(Math.random() * 100),
  selected: false,
});

export default function makeData(len = 200) {
  return range(len).map(() => ({
    ...newRow(),
    children: range(10).map(newRow),
  }));
}
