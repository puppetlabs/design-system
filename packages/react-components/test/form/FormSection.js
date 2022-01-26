import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import React from 'react';
import sinon from 'sinon';
import ReactDOM from 'react-dom';

import FormSection from '../../source/react/library/form/FormSection';

let sandbox;
let mockTooltip;

describe('<FormSection />', () => {
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    mockTooltip = sandbox
      .stub(ReactDOM, 'createPortal')
      .callsFake(portal => portal);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should render without blowing up', () => {
    const wrapper = shallow(<FormSection />);

    expect(wrapper.length).to.eql(1);
  });

  it('should render the label with a tooltip when one is provided', () => {
    const wrapper = mount(
      <FormSection title="label boii" tooltip="hello world" />,
    );

    expect(wrapper.find('TooltipHoverArea').length).to.eql(1);
    expect(wrapper.find('TooltipHoverArea').prop('tooltip')).to.eql(
      'hello world',
    );
  });
});
