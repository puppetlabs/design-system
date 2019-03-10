import React from 'react';
import { shallow, mount } from 'enzyme';
import { Logo, Card } from '@puppet/react-components';

import AuthLayout from './AuthLayout';

const requiredProps = {
  title: 'title',
  product: 'insights',
};

test('renders without crashing', () => {
  shallow(<AuthLayout {...requiredProps} />);
});

test('passes product prop to the logo component', () => {
  shallow(<AuthLayout {...requiredProps} />)
    .find(Logo)
    .should.have.prop('product', 'insights');
});

test('renders a title', () => {
  mount(<AuthLayout {...requiredProps} />).should.contain.text('title');
});

test('renders a subtitle if present', () => {
  mount(
    <AuthLayout {...requiredProps} subtitle="subtitle" />,
  ).should.contain.text('subtitle');
});

test('Renders children inside a card', () => {
  mount(<AuthLayout {...requiredProps}>Hi</AuthLayout>)
    .find(Card)
    .should.contain.text('Hi');
});

test('propagates className to outer element', () => {
  shallow(
    <AuthLayout {...requiredProps} className="test" />,
  ).should.have.className('test');
});

test('propagates all additinal props to outer element', () => {
  const extraProps = {
    onClick() {},
    'aria-label': 'hi',
  };

  shallow(<AuthLayout {...requiredProps} {...extraProps} />).should.have.props(
    extraProps,
  );
});
