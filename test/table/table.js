import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Table from '../../source/react/library/table/Table';

const defaultData = [{
  columnOne: 'The',
  columnTwo: 'Spain',
  columnThree: 'On',
  order: 1,
}, {
  columnOne: 'Rain',
  columnTwo: 'Stays',
  columnThree: 'The',
  order: 2,
}, {
  columnOne: 'In',
  columnTwo: 'Mainly',
  columnThree: 'Plain',
  order: 3,
}];

const defaultColumns = [{
  column: 'columnOne',
  displayName: 'ColumnOne',
  order: 1,
}, {
  column: 'columnTwo',
  displayName: 'ColumnTwo',
  order: 2,
}, {
  column: 'columnThree',
  displayName: 'ColumnThree',
  order: 2,
}];

describe('<Table />', () => {
  jsdom();

  it('should render without blowing up', () => {
    const wrapper = shallow(<Table
      data={ defaultData }
      columns={ defaultColumns }
    />);

    expect(wrapper.length).to.eql(1);
  });
});
