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
        <Form.Field
          key="test-child"
          type="input"
          name="test"
          className="test-child"
        />
      </Form>,
    );

    expect(Object.keys(wrapper.find('.test-child').props())).to.eql([
      'type',
      'name',
      'className',
      'inline',
      'size',
      'error',
      'label',
      'tooltip',
      'description',
      'elementProps',
      'onChange',
      'value',
    ]);
  });

  describe('form with sections', () => {
    it('should properly set the values from the fields in the section', () => {
      const wrapper = shallow(
        <Form>
          <Form.Section key="test-section">
            <Form.Field
              key="test-field"
              type="input"
              name="test"
              value="myValue"
            />
          </Form.Section>
        </Form>,
      );

      expect(wrapper.find('FormField').prop('value')).to.eql('myValue');
    });
  });

  describe('form with custom labels', () => {
    it('should allow button labels to be overriden', () => {
      const wrapper = shallow(
        <Form
          submittable
          cancellable
          submitLabel="my submit label"
          cancelLabel="my cancel label"
        />,
      );

      expect(wrapper.find('Button[secondary=true]').prop('label')).to.eql('my cancel label');
      expect(wrapper.find('Button[secondary=false]').prop('label')).to.eql('my submit label');
    });
  });
});
