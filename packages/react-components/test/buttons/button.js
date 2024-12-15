import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Button from '../../source/react/library/button';

describe('<Button />', () => {
  jsdom({ skipWindowCheck: true });

  it('renders the child content inside a button', () => {
    expect(shallow(<Button>Hi</Button>).find('button')).to.have.text('Hi');
  });

  it('applies the provided className to the inner button element', () => {
    expect(
      shallow(<Button className="classy" />).find('button'),
    ).to.have.className('classy');
  });

  it('passes through additional props to the inner button element', () => {
    const extraProps = {
      onChange() {},
      disabled: true,
    };

    expect(shallow(<Button {...extraProps} />).find('button')).to.have.props(
      extraProps,
    );
  });

  it('renders a button element by default', () => {
    expect(shallow(<Button />)).to.have.descendants('button');
  });

  it('renders the element specified by the "as" prop', () => {
    expect(shallow(<Button as="a" />)).to.have.descendants('a');

    // eslint-disable-next-line
    const MyComponent = ({ children, ...props }) => (
      <div {...props}>{children}</div>
    );

    expect(shallow(<Button as={MyComponent} />)).to.have.descendants(
      MyComponent,
    );
  });

  it('assigns the provided buttonType prop as type on the inner element', () => {
    expect(shallow(<Button buttonType="submit" />).find('button')).to.have.attr(
      'type',
      'submit',
    );
  });

  it('assigns button type attribute by default on button elements', () => {
    expect(shallow(<Button />).find('button')).to.have.attr('type', 'button');
  });

  it('does not assign a default type on non-button elements', () => {
    expect(shallow(<Button as="a" />).find('a')).to.not.have.attr('type');
  });

  it('renders a loader if loading', () => {
    expect(shallow(<Button loading />)).to.have.descendants('Loading');
  });

  it('applies a disabled attribute if disabled or loading', () => {
    expect(shallow(<Button disabled />).find('button')).to.have.attr(
      'disabled',
    );
    expect(shallow(<Button loading />).find('button')).to.have.attr('disabled');
  });

  it('applies an aria-disabled attribute to non-buttons if disabled or loading', () => {
    expect(shallow(<Button as="a" disabled />).find('a')).to.have.attr(
      'aria-disabled',
    );
    expect(shallow(<Button as="a" loading />).find('a')).to.have.attr(
      'aria-disabled',
    );
  });

  it('applies an aria-disabled attribute to non-buttons if disabled or loading', () => {
    expect(shallow(<Button as="a" disabled />).find('a')).to.have.attr(
      'aria-disabled',
    );
    expect(shallow(<Button as="a" loading />).find('a')).to.have.attr(
      'aria-disabled',
    );
  });

  it("doesn't apply an aria-disabled attribute to buttons", () => {
    expect(shallow(<Button />).find('button')).not.to.have.attr(
      'aria-disabled',
    );
    expect(shallow(<Button disabled />).find('button')).not.to.have.attr(
      'aria-disabled',
    );
    expect(shallow(<Button loading />).find('button')).not.to.have.attr(
      'aria-disabled',
    );
  });

  it('renders an icon of the specified type if provided', () => {
    expect(shallow(<Button icon="pencil" />).find('Icon')).to.have.prop(
      'type',
      'pencil',
    );
  });

  it('renders a trailing icon of the specified type if provided', () => {
    expect(shallow(<Button trailingIcon="pencil" />).find('Icon')).to.have.prop(
      'type',
      'pencil',
    );
  });
});
