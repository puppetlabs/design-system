import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Popover from '../../source/react/library/popover/Popover';

describe('<Popover />', () => {
  jsdom({ skipWindowCheck: true });

  it('should render a div by default', () => {
    expect(shallow(<Popover>Popover</Popover>)).to.have.descendants('div');
  });

  it('should propagate user supplied className', () => {
    expect(
      shallow(<Popover className="my-class">Popover</Popover>),
    ).to.have.className('my-class');
  });

  it('should properly render provided children', () => {
    const wrapper = shallow(
      <Popover>
        <span className="test-child">hello!</span>
      </Popover>,
    );

    expect(wrapper.find('.test-child').length).to.eql(1);
  });

  it('should render left type by default', () => {
    const wrapper = shallow(<Popover />);

    expect(wrapper).to.have.className('rc-popover-left');
  });

  it('should render elevation class for each allowed element elevation', () => {
    const elevations = [0, 50, 100, 150, 200, 400, 800];

    elevations.forEach((elevation) => {
      const wrapper = shallow(<Popover elevation={elevation} />);

      expect(wrapper).to.have.className(`rc-popover-elevation-${elevation}`);
    });
  });

  it('should respond to close event if onClose provided', () => {
    const onClose = sinon.spy();
    const wrapper = mount(<Popover onClose={onClose} />);

    wrapper.find('Button').simulate('click');

    // eslint-disable-next-line
    expect(onClose).to.have.been.called;
  });
});
