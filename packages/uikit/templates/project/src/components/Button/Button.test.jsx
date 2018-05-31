import { shallow } from 'enzyme';
import React from 'react';

import Button from '.';
import typography from '../../styles/typography.css';

test('Renders the child content inside a button', () => {
  shallow(<Button>Hi</Button>)
    .find('button')
    .should.have.text('Hi');
});

test('Applies the provided className to the inner button element', () => {
  shallow(<Button className="classy" />)
    .find('button')
    .should.have.className('classy');
});

test('Passes through additional props to the inner button element', () => {
  const extraProps = {
    onChange() {},
    disabled: true,
  };

  shallow(<Button {...extraProps} />)
    .find('button')
    .should.have.props(extraProps);
});

test('Applies the correct typography', () => {
  shallow(<Button />).should.have.className(typography.actionPrimary);
  shallow(<Button secondary />).should.have.className(
    typography.actionSecondary,
  );
  shallow(<Button tertiary />).should.have.className(
    typography.actionSecondary,
  );
  shallow(<Button link />).should.have.className(typography.bodyLink);
});
