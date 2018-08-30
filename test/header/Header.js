import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import React from 'react';

import Header from '../../source/react/library/header/Header';

describe('<Header />', () => {
  jsdom({ skipWindowCheck: true });
  const defaultProps = { product: 'insights' };

  it('should render without blowing up', () => {
    shallow(<Header {...defaultProps} />);
  });

  it('should render buttons for the provided nav items', () => {
    const nav = [
      { key: 'settings', icon: 'gear' },
      { key: 'tokens', icon: 'key' },
    ];

    const wrapper = shallow(<Header {...defaultProps} nav={nav} />);

    expect(wrapper.find('Button').length).to.eql(2);
  });

  it('should allow nav items to be clicked', () => {
    const nav = [{ key: 'settings', icon: 'gear' }];
    const onNavClick = sinon.spy();
    const wrapper = shallow(
      <Header {...defaultProps} nav={nav} onNavClick={onNavClick} />,
    );

    wrapper.find('Button').simulate('click');

    expect(onNavClick.callCount).to.eql(1);
    expect(onNavClick.lastCall.args[0]).to.eql('settings');
  });

  describe('rendering controls for smaller screens', () => {
    it('should render a control for toggling the menu', () => {
      const wrapper = shallow(<Header {...defaultProps} />);

      expect(wrapper.find('.rc-header-menu-control').length).to.eql(1);
    });

    it('should allow the menu to be toggled', () => {
      const wrapper = shallow(<Header {...defaultProps} />);

      // Hamburger menu by default
      expect(
        wrapper
          .find('.rc-header-menu-control')
          .find('Icon')
          .prop('type'),
      ).to.eql('list');

      wrapper.find('.rc-header-menu-control').simulate('click');

      // Now it allows the menu to be closed.
      expect(
        wrapper
          .find('.rc-header-menu-control')
          .find('Icon')
          .prop('type'),
      ).to.eql('close');
    });
  });
});
