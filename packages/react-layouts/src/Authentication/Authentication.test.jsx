import React from 'react';
import { shallow, mount } from 'enzyme';
import { Logo, Card } from '@puppet/react-components';
import PageContent from '../PageContent';

import Authentication from './Authentication';

const requiredProps = {
  title: 'title',
  product: 'Product',
};

test('renders without crashing', () => {
  shallow(<Authentication {...requiredProps} />);
});

test('passes product prop to the logo component', () => {
  shallow(<Authentication {...requiredProps} />)
    .find(Logo)
    .should.have.prop('product', 'Product');
});

test('renders a title', () => {
  mount(<Authentication {...requiredProps} />).should.contain.text('title');
});

test('renders a subtitle if present', () => {
  mount(
    <Authentication {...requiredProps} subtitle="subtitle" />,
  ).should.contain.text('subtitle');
});

test('Renders children inside a card', () => {
  mount(<Authentication {...requiredProps}>Hi</Authentication>)
    .find(Card)
    .should.contain.text('Hi');
});

test('propagates className to outer element', () => {
  shallow(
    <Authentication {...requiredProps} className="test" />,
  ).should.have.className('test');
});

test('propagates all additinal props to outer element', () => {
  const extraProps = {
    onClick() {},
    'aria-label': 'hi',
  };

  shallow(
    <Authentication {...requiredProps} {...extraProps} />,
  ).should.have.props(extraProps);
});
