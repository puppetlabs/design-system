import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Badge from '../../source/react/library/badge/Badge';

describe('<Badge />', () => {
  jsdom({ skipWindowCheck: true });

  it('applies provided classNames to the outer wrapper', () => {
    const className = 'foo';
    expect(shallow(<Badge className={className} />)).to.have.className(
      className,
    );
  });

  it('applies provided inline styles to the outer wrapper', () => {
    const style = { hidden: true };
    expect(shallow(<Badge style={style} />)).to.have.to.have.style(style);
  });

  it('should render the children provided', () => {
    expect(shallow(<Badge>hello world!</Badge>)).to.have.text('hello world!');
  });

  it('adds a new class for the designated type', () => {
    const neutral = 'neutral'; // default
    const danger = 'danger';

    expect(shallow(<Badge>hello world!</Badge>)).to.have.className(
      `rc-badge-${neutral}`,
    );

    expect(
      shallow(<Badge type={danger}>hello world!</Badge>),
    ).to.have.className(`rc-badge-${danger}`);
  });

  it('adds a new class for the designated weight', () => {
    const bold = 'bold'; // default
    const subtle = 'subtle';

    expect(shallow(<Badge>hello world!</Badge>)).to.have.className(
      `rc-badge-${bold}`,
    );

    expect(
      shallow(<Badge weight={subtle}>hello world!</Badge>),
    ).to.have.className(`rc-badge-${subtle}`);
  });

  it('adds a new class if pill prop is true', () => {
    expect(shallow(<Badge>hello world!</Badge>)).to.not.have.className(
      `rc-badge-pill`,
    );

    expect(shallow(<Badge pill>hello world!</Badge>)).to.have.className(
      `rc-badge-pill`,
    );
  });
});
