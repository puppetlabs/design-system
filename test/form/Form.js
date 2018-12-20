import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import React from 'react';
import sinon from 'sinon';

import Form from '../../source/react/library/form/Form';
import Button from '../../source/react/library/buttons/Button';

describe('<Form />', () => {
  it('should propagate user provided className', () => {
    expect(shallow(<Form className="test-class" />)).to.have.className(
      'test-class',
    );
  });

  it('should propagate user provided inline style', () => {
    expect(shallow(<Form style={{ marginTop: 10 }} />)).to.have.style(
      'margin-top',
      '10px',
    );
  });

  describe('action buttons', () => {
    it('should render no actions by default', () => {
      expect(shallow(<Form />)).not.to.have.descendants(Button);
    });

    it('should render a submit button if the submittable prop is true', () => {
      expect(shallow(<Form submittable />))
        .to.have.exactly(1)
        .descendants(Button);

      expect(shallow(<Form submittable />).find(Button)).to.have.prop(
        'type',
        'submit',
      );
    });

    it('should render a submit button with custom submitLabel if provided', () => {
      expect(
        mount(<Form submittable submitLabel="test-label" />).find(Button),
      ).to.contain.text('test-label');
    });

    it('should render a cancel button if the submittable prop is true', () => {
      expect(shallow(<Form cancellable />))
        .to.have.exactly(1)
        .descendants(Button);
    });

    it('should render a cancel button with custom cancelLabel if provided', () => {
      expect(
        mount(<Form submittable submitLabel="test-label" />).find(Button),
      ).to.contain.text('test-label');
    });

    it('should execute the onCancel callback when the cancel button is pressed', () => {
      const onCancel = sinon.spy();

      const wrapper = mount(<Form cancellable onCancel={onCancel} />);

      wrapper.find('button').simulate('click');

      // eslint-disable-next-line
      expect(onCancel).to.have.been.called;
    });
  });

  describe('uncontrolled mode', () => {
    it('should provide each form field a value from the associated key on initialValues', () => {
      const initialValues = {
        a: 'A',
        b: 'B',
      };

      const wrapper = shallow(
        <Form initialValues={initialValues}>
          <Form.Field type="text" name="a" label="label-A" />
          <Form.Field type="text" name="b" label="label-B" />
        </Form>,
      );

      expect(wrapper.find(Form.Field).first()).to.have.prop('value', 'A');
      expect(wrapper.find(Form.Field).last()).to.have.prop('value', 'B');
    });

    it('should set the intial values state equal to initialValues', () => {
      const initialValues = {
        a: 'A',
        b: 'B',
      };

      const wrapper = shallow(
        <Form initialValues={initialValues}>
          <Form.Field type="text" name="a" label="label-A" />
          <Form.Field type="text" name="b" label="label-B" />
        </Form>,
      );

      expect(wrapper.state().values).to.eql(initialValues);
    });

    it('should update values state when an input changes', () => {
      const initialValues = {
        a: 'A',
        b: 'B',
      };

      const wrapper = mount(
        <Form initialValues={initialValues}>
          <Form.Field type="text" name="a" label="label-A" />
          <Form.Field type="text" name="b" label="label-B" />
        </Form>,
      );

      wrapper
        .find('input')
        .first()
        .simulate('change', { target: { value: 'AA' } });

      expect(wrapper.state().values).to.eql({ a: 'AA', b: 'B' });
    });

    it('should not fire onChange callback when inputs change', () => {
      const initialValues = {
        a: 'A',
        b: 'B',
      };

      const onChange = sinon.spy();

      const wrapper = mount(
        <Form initialValues={initialValues} onChange={onChange}>
          <Form.Field type="text" name="a" label="label-A" />
          <Form.Field type="text" name="b" label="label-B" />
        </Form>,
      );

      wrapper
        .find('input')
        .first()
        .simulate('change', { target: { value: 'AA' } });

      // eslint-disable-next-line
      expect(onChange).to.not.have.been.called;
    });
  });

  describe('controlled mode', () => {
    it('should provide each form field a value from the associated key on values if present', () => {
      const values = {
        a: 'A',
        b: 'B',
      };

      const wrapper = shallow(
        <Form values={values}>
          <Form.Field type="text" name="a" label="label-A" />
          <Form.Field type="text" name="b" label="label-B" />
        </Form>,
      );

      expect(wrapper.find(Form.Field).first()).to.have.prop('value', 'A');
      expect(wrapper.find(Form.Field).last()).to.have.prop('value', 'B');
    });

    it('should update form values when top-level values prop changes', () => {
      const initialValues = {
        a: 'A',
        b: 'B',
      };

      const nextValues = {
        a: 'AA',
        b: 'BB',
      };

      const wrapper = shallow(
        <Form values={initialValues}>
          <Form.Field type="text" name="a" label="label-A" />
          <Form.Field type="text" name="b" label="label-B" />
        </Form>,
      );

      wrapper.setProps({ values: nextValues });

      expect(wrapper.find(Form.Field).first()).to.have.prop('value', 'AA');
      expect(wrapper.find(Form.Field).last()).to.have.prop('value', 'BB');
    });

    it('should execute the onChange callback with the changed field and new values', () => {
      const onChange = sinon.spy();

      const values = {
        a: 'A',
        b: 'B',
      };

      const wrapper = mount(
        <Form values={values} onChange={onChange}>
          <Form.Field type="text" name="a" label="label-A" />
          <Form.Field type="text" name="b" label="label-B" />
        </Form>,
      );

      wrapper
        .find('input')
        .first()
        .simulate('change', { target: { value: 'AA' } });

      expect(onChange).to.have.been.calledWithExactly('a', { a: 'AA', b: 'B' });
    });
  });

  describe('field rendering', () => {
    it('should render each FormField with the appropriate value when nested inside Form.Section', () => {
      const initialValues = {
        a: 'A',
        b: 'B',
      };

      const wrapper = shallow(
        <Form initialValues={initialValues}>
          <Form.Section>
            <Form.Field type="text" name="a" label="label-A" />
          </Form.Section>
          <Form.Field type="text" name="b" label="label-B" />
        </Form>,
      );

      expect(wrapper.find(Form.Field).first()).to.have.prop('value', 'A');
      expect(wrapper.find(Form.Field).last()).to.have.prop('value', 'B');
    });

    it('should render each FormField with the appropriate value when nested inside multiple Form.Sections', () => {
      const initialValues = {
        a: 'A',
        b: 'B',
      };

      const wrapper = shallow(
        <Form initialValues={initialValues}>
          <Form.Section>
            <Form.Section>
              <Form.Field type="text" name="a" label="label-A" />
            </Form.Section>
          </Form.Section>
          <Form.Field type="text" name="b" label="label-B" />
        </Form>,
      );

      expect(wrapper.find(Form.Field).first()).to.have.prop('value', 'A');
      expect(wrapper.find(Form.Field).last()).to.have.prop('value', 'B');
    });

    it('should render each FormField with the appropriate value when nested inside arbitrary elements', () => {
      const initialValues = {
        a: 'A',
        b: 'B',
      };

      const wrapper = shallow(
        <Form initialValues={initialValues}>
          <div>
            <section>
              <Form.Field type="text" name="a" label="label-A" />
            </section>
          </div>
          <Form.Field type="text" name="b" label="label-B" />
        </Form>,
      );

      expect(wrapper.find(Form.Field).first()).to.have.prop('value', 'A');
      expect(wrapper.find(Form.Field).last()).to.have.prop('value', 'B');
    });

    it('should render arbitrary non-field elements', () => {
      const initialValues = {
        a: 'A',
        b: 'B',
      };

      const wrapper = shallow(
        <Form initialValues={initialValues}>
          <Form.Field type="text" name="a" label="label-A" />
          <Form.Field type="text" name="b" label="label-B" />
          <div className="test-div" />
        </Form>,
      );

      expect(wrapper).to.have.descendants('.test-div');
    });
  });

  describe('validation', () => {
    it('should pass on individual field errors if present', () => {
      const initialValues = {
        a: 'A',
        b: 'B',
      };

      const wrapper = shallow(
        <Form submittable initialValues={initialValues}>
          <Form.Field type="text" name="a" label="label-A" error="test-error" />
          <Form.Field type="text" name="b" label="label-B" />
        </Form>,
      );

      expect(wrapper.find(Form.Field).first()).to.have.prop(
        'error',
        'test-error',
      );

      expect(wrapper.find(Button)).to.have.prop('disabled', true);
    });

    it('should not run validators before the submit button is activated', () => {
      const initialValues = {
        a: 'A',
        b: 'B',
      };

      const invalidIfOdd = field =>
        field.length % 2 === 0 ? false : 'this is bad';

      const wrapper = mount(
        <Form submittable initialValues={initialValues}>
          <Form.Field
            type="text"
            name="a"
            label="label-A"
            validator={invalidIfOdd}
          />
          <Form.Field type="text" name="b" label="label-B" />
        </Form>,
      );

      expect(wrapper.find(Form.Field).first()).not.to.have.prop(
        'error',
        'this is bad',
      );

      expect(wrapper.find(Button)).not.to.have.prop('disabled', true);

      wrapper.simulate('submit');

      expect(wrapper.find(Form.Field).first()).to.have.prop(
        'error',
        'this is bad',
      );

      expect(wrapper.find(Button)).to.have.prop('disabled', true);
    });

    it('should reset to turn off validation when new initial values are supplied', () => {
      const initialValues = {
        a: 'A',
        b: 'B',
      };

      const nextValues = {
        a: 'AAA',
        b: 'B',
      };

      const invalidIfOdd = field =>
        field.length % 2 === 0 ? false : 'this is bad';

      const wrapper = mount(
        <Form submittable initialValues={initialValues}>
          <Form.Field
            type="text"
            name="a"
            label="label-A"
            validator={invalidIfOdd}
          />
          <Form.Field type="text" name="b" label="label-B" />
        </Form>,
      );

      wrapper.simulate('submit');
      wrapper.setProps({ initialValues: nextValues });

      expect(wrapper.find(Form.Field).first()).not.to.have.prop(
        'error',
        'this is bad',
      );

      expect(wrapper.find(Button)).not.to.have.prop('disabled', true);
    });
  });
});
