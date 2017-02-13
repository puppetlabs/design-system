import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import ColumnSelect from '../../source/react/library/table/ColumnSelect';

const defaultProps = {
  data: 'Hello, I\'m a happy input',
  onChange: sinon.spy(),
  disabled: false,
};

describe('<ColumnSelect />', () => {
  jsdom();

  it('should render without blowing up', () => {
    const wrapper = shallow(<ColumnSelect { ...defaultProps } />);

    expect(wrapper.length).to.eql(1);
  });
});
