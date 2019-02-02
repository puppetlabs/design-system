import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import FormField, {
  formInputInterface,
} from '../../source/react/library/form/FormField';
import Input, {
  SUPPORTED_TYPES as INPUT_SUPPORTED_TYPES,
} from '../../source/react/library/input/Input';
import Select from '../../source/react/library/select/Select';
import Checkbox from '../../source/react/library/checkbox/Checkbox';
import Switch from '../../source/react/library/switch/Switch';

describe('<FormField />', () => {
  const requiredProps = {
    type: 'text',
    label: 'testLabel',
    onChange: () => {},
    name: 'testField',
  };

  it('propagates user provided className', () => {
    expect(
      shallow(<FormField {...requiredProps} className="test-class" />),
    ).to.have.className('test-class');
  });

  it('propagates user provided inline style', () => {
    expect(
      shallow(<FormField {...requiredProps} style={{ marginTop: 10 }} />),
    ).to.have.style('margin-top', '10px');
  });

  it('renders a label with the provided label text', () => {
    expect(
      shallow(<FormField {...requiredProps} />).find('label'),
    ).to.have.text('testLabel');
  });

  it('renders a label with an htmlFor prop equal to the provided name', () => {
    expect(
      shallow(<FormField {...requiredProps} />).find('label'),
    ).to.have.prop('htmlFor', 'testField');
  });

  it('renders the provided description if present', () => {
    expect(
      shallow(
        <FormField
          {...requiredProps}
          description="This is a field description"
        />,
      ).find('.rc-form-field-description'),
    ).to.have.text('This is a field description');
  });

  it('replaces the description with an error if present', () => {
    expect(
      shallow(
        <FormField
          {...requiredProps}
          description="This is a field description"
          error="This is a field error"
        />,
      ).find('.rc-form-field-description'),
    ).to.have.text('This is a field error');
  });

  it('applies a className per string type prop', () => {
    expect(
      shallow(<FormField {...requiredProps} type="password" />),
    ).to.have.className('rc-form-field-password');
  });

  /**
   * TODO: we could actually grab the values here and make sure they satisfy the propTypes
   */
  it('applies the appropriate props to the inner input element', () => {
    expect(shallow(<FormField {...requiredProps} />).find(Input)).to.have.props(
      Object.keys(formInputInterface),
    );
  });

  it('renders an Input for all Input supported types', () => {
    INPUT_SUPPORTED_TYPES.forEach(type => {
      expect(
        shallow(<FormField {...requiredProps} type={type} />),
      ).to.have.descendants(Input);
    });
  });

  it('renders a Checkbox for checkbox type', () => {
    expect(
      shallow(<FormField {...requiredProps} type="checkbox" />),
    ).to.have.descendants(Checkbox);
  });

  it('renders a Switch for switch type', () => {
    expect(
      shallow(<FormField {...requiredProps} type="switch" />),
    ).to.have.descendants(Switch);
  });

  it('renders a Select for select and multiselect type', () => {
    ['select', 'multiselect'].forEach(type => {
      expect(
        shallow(<FormField {...requiredProps} type={type} />),
      ).to.have.descendants(Select);
    });
  });

  it('renders a custom element when passed in through the type prop', () => {
    const MyInput = () => <div />;

    expect(
      shallow(<FormField {...requiredProps} type={MyInput} />),
    ).to.have.descendants(MyInput);
  });
});
