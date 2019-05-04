import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Tabs from '../../source/react/library/tabs/Tabs';

describe('<Tabs />', () => {
  jsdom({ skipWindowCheck: true });

  it('Renders the child content inside a button', () => {
    expect(shallow(<Tabs>Hi</Tabs>).find('button')).to.have.text('Hi');
  });

  it('Applies the provided className to the inner button element', () => {
    expect(
      shallow(<Tabs className="classy" />).find('button'),
    ).to.have.className('classy');
  });

  it('Passes through additional props to the inner button element', () => {
    const extraProps = {
      onChange() {},
      disabled: true,
    };

    expect(shallow(<Tabs {...extraProps} />).find('button')).to.have.props(
      extraProps,
    );
  });

  it('Renders a button element by default', () => {
    expect(shallow(<Tabs />)).to.have.descendants('button');
  });

  it('Renders the element specified by the "as" prop', () => {
    expect(shallow(<Tabs as="a" />)).to.have.descendants('a');

    // eslint-disable-next-line
    const MyComponent = ({ children, ...props }) => (
      <div {...props}>{children}</div>
    );

    expect(shallow(<Tabs as={MyComponent} />)).to.have.descendants(
      MyComponent,
    );
  });

  it('Assigns the provided buttonType prop as type on the inner element', () => {
    expect(shallow(<Tabs buttonType="submit" />).find('button')).to.have.attr(
      'type',
      'submit',
    );
  });

  it('Assigns button type attribute by default on button elements', () => {
    expect(shallow(<Tabs />).find('button')).to.have.attr('type', 'button');
  });

  it('Does not assign a default type on non-button elements', () => {
    expect(shallow(<Tabs as="a" />).find('a')).to.not.have.attr('type');
  });

  it('Renders a loader if loading', () => {
    expect(shallow(<Tabs loading />)).to.have.descendants('Loading');
  });

  it('Applies a disabled attribute if disabled or loading', () => {
    expect(shallow(<Tabs disabled />).find('button')).to.have.attr(
      'disabled',
    );
    expect(shallow(<Tabs loading />).find('button')).to.have.attr('disabled');
  });

  it('Applies an aria-disabled attribute to non-buttons if disabled or loading', () => {
    expect(shallow(<Tabs as="a" disabled />).find('a')).to.have.attr(
      'aria-disabled',
    );
    expect(shallow(<Tabs as="a" loading />).find('a')).to.have.attr(
      'aria-disabled',
    );
  });

  it('Applies an aria-disabled attribute to non-buttons if disabled or loading', () => {
    expect(shallow(<Tabs as="a" disabled />).find('a')).to.have.attr(
      'aria-disabled',
    );
    expect(shallow(<Tabs as="a" loading />).find('a')).to.have.attr(
      'aria-disabled',
    );
  });

  it('Renders an icon of the specified type if provided', () => {
    expect(shallow(<Tabs icon="pencil" />).find('Icon')).to.have.prop(
      'type',
      'pencil',
    );
  });

  it('Renders a trailing icon of the specified type if provided', () => {
    expect(shallow(<Tabs trailingIcon="pencil" />).find('Icon')).to.have.prop(
      'type',
      'pencil',
    );
  });
});
