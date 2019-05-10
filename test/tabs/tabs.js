import jsdom from 'mocha-jsdom';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import React from 'react';

import Tabs from '../../source/react/library/tabs/Tabs';

describe('<Tabs.Tab />', () => {
  jsdom({ skipWindowCheck: true });

  it('applies the provided className to the outer wrapper', () => {
    const className = 'foo';
    expect(shallow(<Tabs className={className} />)).to.have.className(
      className,
    );
  });

  it('applies the provided inline styles to the outer wrapper', () => {
    const style = { hidden: true };
    expect(shallow(<Tabs style={style} />)).to.have.to.have.style(style);
  });

  it('renders a nav button per each child', () => {
    expect(
      mount(
        <Tabs>
          <span>foo</span>
          <span>foo</span>
        </Tabs>,
      ),
    )
      .to.have.exactly(2)
      .descendants('.rc-button');
  });

  it('renders a panel per each child', () => {
    expect(
      mount(
        <Tabs>
          <span>foo</span>
          <span>foo</span>
        </Tabs>,
      ),
    )
      .to.have.exactly(2)
      .descendants('.rc-tabs-panel');
  });

  it('renders the title prop on Tabs.Tab as the button content', () => {
    const title = 'foo';
    expect(
      mount(
        <Tabs>
          <Tabs.Tab title={title} />
        </Tabs>,
      ).find('.rc-button'),
    ).to.have.text(title);
  });

  it('renders the Tabs.Tab child as the panel content', () => {
    const panel = 'bar';
    expect(
      mount(
        <Tabs>
          <Tabs.Tab>{panel}</Tabs.Tab>
        </Tabs>,
      ).find('.rc-tabs-panel'),
    ).to.have.text(panel);
  });

  it('should respond to click events on Tabs.Tab', () => {
    sinon.spy(Tabs.prototype, 'onClick');
    const wrapper = mount(
      <Tabs>
        <Tabs.Tab />
        <Tabs.Tab />
      </Tabs>,
    );

    // First tab is active by default
    expect(wrapper)
      .to.have.state('activeIndex')
      .equal(0);

    // Click on second tab
    wrapper
      .find('.rc-button')
      .at(1)
      .simulate('click');

    expect(wrapper)
      .to.have.state('activeIndex')
      .equal(1);
  });

  it('should respond to keyDown events on Tabs.Tab', () => {
    sinon.spy(Tabs.prototype, 'onKeyDown');
    const wrapper = mount(
      <Tabs>
        <Tabs.Tab />
        <Tabs.Tab />
      </Tabs>,
    );

    // Simulate right arrow press on first Tab
    wrapper
      .find('.rc-button')
      .at(0)
      .simulate('keydown', { keyCode: 39 });

    expect(wrapper)
      .to.have.state('activeIndex')
      .equal(1);

    // Simulate left arrow press on second Tab
    wrapper
      .find('.rc-button')
      .at(1)
      .simulate('keydown', { keyCode: 37 });

    expect(wrapper)
      .to.have.state('activeIndex')
      .equal(0);

    // Simulate left arrow press on first Tab (to simulate wrapping)
    wrapper
      .find('.rc-button')
      .at(0)
      .simulate('keydown', { keyCode: 37 });

    expect(wrapper)
      .to.have.state('activeIndex')
      .equal(1);
  });
});
