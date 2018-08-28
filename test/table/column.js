import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Column from '../../source/react/library/table/Column';

const defaultProps = {
  column: 'Hello, I am a happy column',
  data: 'Hello, I am a happy data prop',
  onChange: () => {},
  disabled: true,
  rowData: {},
  component: undefined,
};

describe('<Column />', () => {
  jsdom({ skipWindowCheck: true });

  it('should render without blowing up', () => {
    const wrapper = shallow(<Column {...defaultProps} />);

    expect(wrapper.length).to.eql(1);
  });
});
