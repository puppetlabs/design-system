import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import AuthLayout from '../AuthLayout';

import Login from './Login';

test('renders without crashing', () => {
  shallow(<Login />);
});

test('executes onSubmit callback appropriately', () => {
  const onSubmit = sinon.spy();
  const login = shallow(<Login onSubmit={onSubmit} />);

  const values = {
    email: 'email@email.com',
    password: 'password',
  };

  login.instance().onSubmit(values);

  onSubmit.should.have.been.calledWith(values);
});

test('Sets the form error to the value returned by mapErrorToMessage on error', () => {
  const login = shallow(
    <Login
      onSubmit={() => {
        throw new Error('error');
      }}
      mapErrorToMessage={() => 'you screwed up!'}
    />,
  );

  const values = {
    email: 'email@email.com',
    password: 'password',
  };

  login.instance().onSubmit(values);

  login.find('Form').should.have.prop('error', 'you screwed up!');
});

test('propagates additional props to outer element', () => {
  const extraProps = {
    onClick() {},
    className: 'hi',
    style: { margin: 0 },
  };

  shallow(<Login {...extraProps} />).should.have.props(extraProps);
});

test('passes down renderResetPasswordAs prop to action', () => {
  shallow(<Login renderResetPasswordAs="button" />)
    .find(AuthLayout.Action)
    .should.have.prop('as', 'button');
});

test('passes resetPasswordProps to the form action', () => {
  shallow(<Login resetPasswordProps={{ to: '/a/b' }} />)
    .find(AuthLayout.Action)
    .should.have.prop('to', '/a/b');
});
