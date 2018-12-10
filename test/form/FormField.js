import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import FormField from '../../source/react/library/form/FormField';
import Input from '../../source/react/library/input/Input';

describe('<FormField />', () => {
  const defaultProps = {
    type: 'text',
    label: 'testLabel',
    onChange: () => {},
    name: 'testField',
  };

  it('should render without blowing up', () => {
    const wrapper = shallow(<FormField {...defaultProps} />);

    expect(wrapper.length).to.eql(1);
  });

  it('Should render an input element for all supported standard input types', () => {
    ['text', 'password', 'search', 'url'].forEach(type => {
      expect(
        shallow(<FormField {...defaultProps} type={type} />),
      ).to.have.descendants(Input);
    });
  });
});
