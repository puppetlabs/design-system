import React from 'react';
import { shallow } from 'enzyme';
import AuthLayout from 'auth/AuthLayout';

import ResetPasswordSuccess from './ResetPasswordSuccess';

test('renders without crashing', () => {
  shallow(<ResetPasswordSuccess />);
});

test('propagates additional props to outer element', () => {
  const extraProps = {
    onClick() {},
    className: 'hi',
    style: { margin: 0 },
  };

  shallow(<ResetPasswordSuccess {...extraProps} />).should.have.props(
    extraProps,
  );
});

test('passes down renderContinueAs prop to action', () => {
  shallow(<ResetPasswordSuccess renderContinueAs="button" />)
    .find(AuthLayout.Action)
    .should.have.prop('as', 'button');
});

test('passes continueProps to the form action', () => {
  shallow(<ResetPasswordSuccess continueProps={{ to: '/a/b' }} />)
    .find(AuthLayout.Action)
    .should.have.prop('to', '/a/b');
});
