import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import togglable from '../source/react/library/togglable';
import Button from '../source/react/library/buttons/Button';

describe('Button wrapped with togglable', () => {
  jsdom({ skipWindowCheck: true });

  const renderer = togglable(Button);

  it('should be opened by default', () => {
    const elem = React.createElement(renderer);
    const wrapper = shallow(elem);

    expect(wrapper.find('Button').length).to.eql(1);
  });

  it('should render button when passed isOpened', () => {
    const elem = React.createElement(renderer, { isOpened: true });
    const wrapper = shallow(elem);

    expect(wrapper.find('Button').length).to.eql(1);
  });

  it('should not render button when not passed isOpened', () => {
    const elem = React.createElement(renderer, { isOpened: false });
    const wrapper = shallow(elem);

    expect(wrapper.find('Button').length).to.eql(0);
  });

  it('should render the same thing as an unwrapped button', () => {
    const elem = React.createElement(renderer);
    const wrapped = shallow(elem);
    const unwrapped = shallow(<Button />);

    expect(wrapped.html()).to.equal(unwrapped.html());
  });
});
