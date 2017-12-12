import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Form from '../../source/react/library/form/Form';

describe('<Form />', () => {
  it('should render without blowing up', () => {
    const wrapper = shallow(<Form />);

    expect(wrapper.length).to.eql(1);
  });

  it('should render children with the correct props', () => {
    const wrapper = shallow(
      <Form>
        <span key="test-child" className="test-child" />
      </Form>,
    );

    expect(Object.keys(wrapper.find('.test-child').props()))
      .to.eql(['className', 'error', 'value', 'onChange', 'size']);
  });
});
