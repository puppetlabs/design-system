import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import AuthLayout from 'auth/AuthLayout';

import ResetPassword from './ResetPassword';

test('renders without crashing', () => {
  shallow(<ResetPassword />);
});

test('executes onSubmit callback appropriately', () => {
  const onSubmit = sinon.spy();
  const forgotPassword = shallow(
    <ResetPassword token="xyz" onSubmit={onSubmit} />,
  );

  const values = {
    passwordA: 'password',
    passwordB: 'password',
  };

  forgotPassword.instance().onSubmit(values);

  onSubmit.should.have.been.calledWith('xyz', values);
});

test('Sets the form error to the value returned by mapErrorToMessage on error', () => {
  const forgotPassword = shallow(
    <ResetPassword
      onSubmit={() => {
        throw new Error('error');
      }}
      mapErrorToMessage={() => 'you screwed up!'}
    />,
  );

  const values = {
    passwordA: 'password',
    passwordB: 'password',
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

  shallow(<ResetPassword {...extraProps} />).should.have.props(extraProps);
});

test('passes down renderBackToLoginAs prop to action', () => {
  shallow(<ResetPassword renderBackToLoginAs="button" />)
    .find(AuthLayout.Action)
    .should.have.prop('as', 'button');
});

test('passes resetPasswordProps to the form action', () => {
  shallow(<ResetPassword backToLoginProps={{ to: '/a/b' }} />)
    .find(AuthLayout.Action)
    .should.have.prop('to', '/a/b');
});
