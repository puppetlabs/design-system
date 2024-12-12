import jsdom from 'mocha-jsdom';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import { UnwrappedTabs as Tabs } from '../../source/react/library/tabs/Tabs';

describe('<Tabs.Tab />', () => {
  jsdom({ skipWindowCheck: true });

  const defaultTabsProps = {
    id: 'default-tabs',
  };

  it('applies the provided className to the outer wrapper', () => {
    const className = 'foo';
    expect(
      shallow(<Tabs className={className} {...defaultTabsProps} />),
    ).to.have.className(className);
  });

  it('applies the provided inline styles to the outer wrapper', () => {
    const style = { hidden: true };
    expect(
      shallow(<Tabs style={style} {...defaultTabsProps} />),
    ).to.have.to.have.style(style);
  });

  it('renders a nav button per each child', () => {
    expect(
      mount(
        <Tabs {...defaultTabsProps}>
          <Tabs.Tab id="1">foo</Tabs.Tab>
          <Tabs.Tab id="2">foo</Tabs.Tab>
        </Tabs>,
      ),
    )
      .to.have.exactly(2)
      .descendants('.rc-button');
  });

  it('renders a panel per each child', () => {
    expect(
      mount(
        <Tabs {...defaultTabsProps}>
          <Tabs.Tab id="1">foo</Tabs.Tab>
          <Tabs.Tab id="2">foo</Tabs.Tab>
        </Tabs>,
      ),
    )
      .to.have.exactly(2)
      .descendants('.rc-tabs-panel');
  });

  it('renders siblings of Tabs.Tab', () => {
    expect(
      mount(
        <Tabs {...defaultTabsProps}>
          <Tabs.Tab id="1">foo</Tabs.Tab>
          <Tabs.Tab id="2">foo</Tabs.Tab>
          <span id="sibling-of-tabs">Hello world</span>
        </Tabs>,
      ),
    )
      .to.have.exactly(1)
      .descendants('#sibling-of-tabs');
  });

  it('renders the title prop on Tabs.Tab as the button content', () => {
    const title = 'foo';
    expect(
      mount(
        <Tabs {...defaultTabsProps}>
          <Tabs.Tab title={title} id="1" />
        </Tabs>,
      ).find('.rc-button'),
    ).to.have.text(title);
  });

  it('renders the Tabs.Tab child as the panel content', () => {
    const panel = 'bar';
    expect(
      mount(
        <Tabs {...defaultTabsProps}>
          <Tabs.Tab id="1">{panel}</Tabs.Tab>
        </Tabs>,
      ).find('.rc-tabs-panel'),
    ).to.have.text(panel);
  });

  it('should respond to click events on Tabs.Tab', () => {
    const wrapper = mount(
      <Tabs {...defaultTabsProps}>
        <Tabs.Tab id="one" />
        <Tabs.Tab id="two" />
      </Tabs>,
    );

    // First tab is active by default
    expect(wrapper).to.have.state('activeTab').equal('one');

    // Click on second tab
    wrapper.find('.rc-button').at(1).simulate('click');

    expect(wrapper).to.have.state('activeTab').equal('two');
  });

  // NOTE: I am disabling this test for now. Keydown events now subsequently
  // triggers an artificial click event
  // it('should respond to keyDown events on Tabs.Tab', async () => {
  //   const wrapper = mount(
  //     <Tabs {...defaultTabsProps}>
  //       <Tabs.Tab id="1" />
  //       <Tabs.Tab id="2" />
  //     </Tabs>,
  //   );
  //
  //   // Simulate right arrow press on first Tab
  //   wrapper
  //     .find('.rc-button')
  //     .at(1)
  //     .simulate('keydown', { keyCode: 39 });
  //
  //   expect(wrapper)
  //     .to.have.state('activeTab')
  //     .equal('2');
  //
  //   // Simulate left arrow press on second Tab
  //   wrapper
  //     .find('.rc-button')
  //     .at(1)
  //     .simulate('keydown', { keyCode: 37 });
  //
  //   expect(wrapper)
  //     .to.have.state('activeTab')
  //     .equal('1');
  //
  //   // Simulate left arrow press on first Tab (to simulate wrapping)
  //   wrapper
  //     .find('.rc-button')
  //     .at(0)
  //     .simulate('keydown', { keyCode: 37 });
  //
  //   expect(wrapper)
  //     .to.have.state('activeTab')
  //     .equal('2');
  // });
});
