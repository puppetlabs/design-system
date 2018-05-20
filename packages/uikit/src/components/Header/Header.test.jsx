import { shallow } from 'enzyme';
import React from 'react';

import Header from '.';
import typography from '../../styles/typography.css';

test('Renders the child content inside the element', () => {
  shallow(<Header>Hi</Header>).should.have.text('Hi');
});

test('Applies the correct typographic classNames according to the as and number props', () => {
  shallow(<Header />).should.have.className(typography.heading1);
  shallow(<Header as="h2" />).should.have.className(typography.heading2);
  shallow(<Header as="h3" />).should.have.className(typography.heading3);
  shallow(<Header as="h4" />).should.have.className(typography.heading4);
  shallow(<Header numbers />).should.have.className(typography.numbersH1);
  shallow(<Header numbers as="h2" />).should.have.className(
    typography.numbersH2,
  );
});

test('Renders the correct header element according to the as prop', () => {
  shallow(<Header />).should.have.type('h1');
  shallow(<Header as="h2" />).should.have.type('h2');
  shallow(<Header as="h3" />).should.have.type('h3');
  shallow(<Header as="h4" />).should.have.type('h4');
});
