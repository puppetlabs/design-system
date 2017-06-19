import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import ColumnInput from '../../source/react/library/table/ColumnInput';

const defaultProps = {
  data: 'Hello, I\'m a happy input',
  onChange: () => {},
  disabled: false,
};

describe('<ColumnInput />', () => {
  jsdom({ skipWindowCheck: true });

  it('should render without blowing up', () => {
    const wrapper = shallow(<ColumnInput { ...defaultProps } />);

    expect(wrapper.length).to.eql(1);
  });
});
