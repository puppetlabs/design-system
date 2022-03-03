import React from 'react';
import { shallow, mount } from 'enzyme';

import PageContent from './PageContent';

test('renders children', () => {
  shallow(<PageContent>Hi</PageContent>).should.have.text('Hi');
});

test('propagates className to outer element', () => {
  shallow(
    <PageContent className="classy">Hi</PageContent>,
  ).should.have.className('classy');
});

test('propagates innerClassName to inner element', () => {
  mount(<PageContent innerClassName="classy">Hi</PageContent>)
    .childAt(0)
    .childAt(0)
    .should.have.className('classy');
});

test('applies delayed className only if delayed and loading', () => {
  mount(
    <PageContent delayed loading>
      Hi
    </PageContent>,
  ).should.have.className('rl-page-content-delayed');

  shallow(<PageContent delayed>Hi</PageContent>).should.not.have.className(
    'rl-page-content-delayed',
  );
});
