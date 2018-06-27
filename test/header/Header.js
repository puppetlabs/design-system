import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import React from 'react';

import Header from '../../source/react/library/header/Header';

describe('<Header />', () => {
  jsdom({ skipWindowCheck: true });

  it('should render without blowing up', () => {
    shallow(<Header />);
  });

  it('should render buttons for the provided nav items', () => {
    const nav = [
      { key: 'settings', icon: 'gear' },
      { key: 'tokens', icon: 'key' },
    ];

    const wrapper = shallow(<Header nav={ nav } />);

    expect(wrapper.find('Button').length).to.eql(2);
  });

  it('should allow nav items to be clicked', () => {
    const nav = [{ key: 'settings', icon: 'gear' }];
    const onNavClick = sinon.spy();
    const wrapper = shallow(<Header nav={ nav } onNavClick={ onNavClick } />);

    wrapper.find('Button').simulate('click');

    expect(onNavClick.callCount).to.eql(1);
    expect(onNavClick.lastCall.args[0]).to.eql('settings');
  });
});
