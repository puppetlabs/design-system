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

  it('should render the label with a tooltip when one is provided', () => {
    const wrapper = shallow(
      <FormField
        { ...defaultProps }
        label="label boii"
        tooltip="hello world"
      />,
    );

    expect(wrapper.find('TooltipHoverArea').length).to.eql(1);
    expect(wrapper.find('TooltipHoverArea').prop('tooltip')).to.eql('hello world');
  });
});
