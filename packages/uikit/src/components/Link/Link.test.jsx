import { shallow } from 'enzyme';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import Link from '.';
import typography from '../../styles/typography.css';

test('Renders a react router link for internal links', () => {
  shallow(<Link to="/">Hi</Link>).should.have.type(ReactRouterLink);
});

test('Renders an anchor tag for external links', () => {
  shallow(<Link to="https://www.google.com">Hi</Link>).should.have.type('a');
});

test('Renders a button if the button prop is true', () => {
  shallow(<Link button>Hi</Link>).should.have.type('button');
});

test('Applies the correct typographic classNames according to the small and secondary props', () => {
  shallow(<Link to="/">Hi</Link>).should.have.className(typography.bodyLink);

  shallow(
    <Link small to="/">
      Hi
    </Link>,
  ).should.have.className(typography.bodyLinkSmall);

  shallow(
    <Link secondary to="/">
      Hi
    </Link>,
  ).should.have.className(typography.bodyLinkSecondary);

  shallow(
    <Link small secondary to="/">
      Hi
    </Link>,
  ).should.have.className(typography.bodyLinkSecondarySmall);
});
