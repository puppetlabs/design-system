import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Icon from '../../source/react/library/icon';

describe('<Icon />', () => {
  jsdom({ skipWindowCheck: true });

  it('should have className "rc-icon-edit" if "edit" is passed in as type', () => {
    const props = { type: 'edit' };
    const wrapper = shallow(<Icon { ...props } />);

    expect(wrapper.hasClass('rc-icon-edit')).to.equal(true);
  });

  it('should render custom svg and viewBox when passed one', () => {
    const props = { svg: <svg className="test-svg">test</svg>, viewBox: 'viewBox' };
    const wrapper = shallow(<Icon { ...props } />);

    expect(wrapper.find('.test-svg')).to.have.length(1);
    expect(wrapper.find('.rc-icon').props().viewBox).to.eql('viewBox');
  });

  it('should return null if no svg is supplied', () => {
    const props = { type: 'unedfinedType' };
    const wrapper = shallow(<Icon { ...props } />);

    expect(wrapper.getElement(0)).to.eql(null);
  });
});
