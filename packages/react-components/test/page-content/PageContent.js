import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import PageContent from '../../source/react/library/page-content';

describe('<PageContent />', () => {
  it('renders children', () => {
    expect(shallow(<PageContent>Hi</PageContent>)).to.have.text('Hi');
  });

  it('propagates className to outer element', () => {
    expect(
      shallow(<PageContent className="classy">Hi</PageContent>),
    ).to.have.className('classy');
  });

  it('propagates innerClassName to inner element', () => {
    expect(
      mount(<PageContent innerClassName="classy">Hi</PageContent>)
        .childAt(0)
        .childAt(0),
    ).to.have.className('classy');
  });

  it('applies delayed className only if delayed and loading', () => {
    expect(
      mount(
        <PageContent delayed loading>
          Hi
        </PageContent>,
      ),
    ).to.have.className('rl-page-content-delayed');

    expect(
      shallow(<PageContent delayed>Hi</PageContent>),
    ).to.not.have.className('rl-page-content-delayed');
  });
});
