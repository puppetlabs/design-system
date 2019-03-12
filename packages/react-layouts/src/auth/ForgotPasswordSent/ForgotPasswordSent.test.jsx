import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import AuthLayout from 'auth/AuthLayout';

import ForgotPasswordSent from './ForgotPasswordSent';

test('renders without crashing', () => {
  shallow(<ForgotPasswordSent />);
});

test('executes onSubmit callback appropriately', () => {
  const onSubmit = sinon.spy();
  const forgotPassword = shallow(<ForgotPasswordSent onSubmit={onSubmit} />);

  const values = {
    email: 'email@email.com',
    password: 'password',
  };

  forgotPassword.instance().onSubmit(values);

  onSubmit.should.have.been.calledWith(values);
});

test('Sets the form error to the value returned by mapErrorToMessage on error', () => {
  const forgotPassword = shallow(
    <ForgotPasswordSent
      onSubmit={() => {
        throw new Error('error');
      }}
      mapErrorToMessage={() => 'you screwed up!'}
    />,
  );

  const values = {
    email: 'email@email.com',
  };

  forgotPassword.instance().onSubmit(values);

  forgotPassword.find('Form').should.have.prop('error', 'you screwed up!');
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
