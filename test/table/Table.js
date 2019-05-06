import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
// import { expect } from 'chai';
// import sinon from 'sinon';
import React from 'react';

import Table from '../../source/react/library/table/Table';

describe('<Table />', () => {
  jsdom({ skipWindowCheck: true });

  const columns = [
    {
      dataKey: 'name',
    },
  ];

  it('renders without crashing', () => {
    shallow(<Table columns={columns} />);
  });
});
