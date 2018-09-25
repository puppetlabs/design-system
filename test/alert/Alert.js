import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Alert from '../../source/react/library/alert/Alert';

describe('<Alert />', () => {
  it('should render without blowing up', () => {
    const wrapper = shallow(<Alert message="i'm an alert" />);

    expect(wrapper.length).to.eql(1);
  });
});
