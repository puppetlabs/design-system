import React from 'react';
import { shallow } from 'enzyme';
import AuthLayout from '../AuthLayout';

import ForgotPasswordSent from './ForgotPasswordSent';

test('renders without crashing', () => {
  shallow(<ForgotPasswordSent />);
});

test('propagates additional props to outer element', () => {
  const extraProps = {
    onClick() {},
    className: 'hi',
    style: { margin: 0 },
  };

  shallow(<ForgotPasswordSent {...extraProps} />).should.have.props(extraProps);
});

test('passes down renderBackToLoginAs prop to action', () => {
  shallow(<ForgotPasswordSent renderBackToLoginAs="button" />)
    .find(AuthLayout.Action)
    .should.have.prop('as', 'button');
});

test('passes resetPasswordProps to the form action', () => {
  shallow(<ForgotPasswordSent backToLoginProps={{ to: '/a/b' }} />)
    .find(AuthLayout.Action)
    .should.have.prop('to', '/a/b');
});
