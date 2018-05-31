import { shallow } from 'enzyme';
import React from 'react';

import Card from '.';

test('Renders child content', () => {
  shallow(<Card>Hi</Card>).should.have.text('Hi');
});

test('Propagates user provided className', () => {
  shallow(<Card className="classy" />).should.have.className('classy');
});

test('Passes through additional props to the inner element', () => {
  const extraProps = {
    style: {},
    onClick() {},
  };

  shallow(<Card {...extraProps} />).should.have.props(extraProps);
});

test('Renders a div by default', () => {
  shallow(<Card />).should.have.type('div');
});

test('Renders an anchor tag if the link prop is true', () => {
  shallow(<Card link />).should.have.type('a');
});
