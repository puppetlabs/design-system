import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import FormField from '../../source/react/library/form/FormField';

describe('<FormField />', () => {
  const defaultProps = {
    type: 'input',
    onChange: () => {},
    name: 'testField',
  };

  it('should render without blowing up', () => {
    const wrapper = shallow(<FormField { ...defaultProps } />);

    expect(wrapper.length).to.eql(1);
  });
});
