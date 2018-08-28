import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import ColumnCheckbox from '../../source/react/library/table/ColumnCheckbox';

const defaultProps = {
  column: "Hello, I'm a happy checkbox",
  onChange: () => {},
  checked: true,
  rowData: {},
};

describe('<ColumnCheckbox />', () => {
  jsdom({ skipWindowCheck: true });

  it('should render without blowing up', () => {
    const wrapper = shallow(<ColumnCheckbox {...defaultProps} />);

    expect(wrapper.length).to.eql(1);
  });
});
