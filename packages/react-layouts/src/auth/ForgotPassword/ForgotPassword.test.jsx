import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import AuthLayout from 'auth/AuthLayout';

import ForgotPassword from './ForgotPassword';

test('renders without crashing', () => {
  shallow(<ForgotPassword />);
});

test('executes onSubmit callback appropriately', () => {
  const onSubmit = sinon.spy();
  const forgotPassword = shallow(<ForgotPassword onSubmit={onSubmit} />);

  const values = {
    email: 'email@email.com',
    password: 'password',
  };

  forgotPassword.instance().onSubmit(values);

  onSubmit.should.have.been.calledWith(values);
});

test('Sets the form error to the value returned by mapErrorToMessage on error', () => {
  const forgotPassword = shallow(
    <ForgotPassword
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

  shallow(<ForgotPassword {...extraProps} />).should.have.props(extraProps);
});

test('passes down renderBackToLoginAs prop to action', () => {
  shallow(<ForgotPassword renderBackToLoginAs="button" />)
    .find(AuthLayout.Action)
    .should.have.prop('as', 'button');
});

test('passes resetPasswordProps to the form action', () => {
  shallow(<ForgotPassword backToLoginProps={{ to: '/a/b' }} />)
    .find(AuthLayout.Action)
    .should.have.prop('to', '/a/b');
});
