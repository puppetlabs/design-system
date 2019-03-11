import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import Confirmation from './Confirmation';

test('renders without crashing', () => {
  shallow(<Confirmation />);
});

test('executes the validateToken callback on mount', () => {
  const validateToken = sinon.spy();
  mount(<Confirmation token="xyz" validateToken={validateToken} />);

  validateToken.should.have.been.calledWith('xyz');
});

test('Sets the form error to the value returned by mapTokenErrorToMessage on token validation error', () => {
  const confirmation = shallow(
    <Confirmation
      token="xyz"
      validateToken={() => {
        throw new Error('error');
      }}
      mapTokenErrorToMessage={() => 'Invalid token'}
    />,
  );

  confirmation.find('Form').should.have.prop('error', 'Invalid token');
});

test('executes onSubmit callback appropriately', () => {
  const onSubmit = sinon.spy();
  const confirmation = shallow(
    <Confirmation token="xyz" onSubmit={onSubmit} />,
  );

  const values = {
    name: 'name',
    email: 'email@email.com',
    company: 'company',
    passwordA: 'password',
    passwordb: 'password',
  };

  confirmation.instance().onSubmit(values);

  onSubmit.should.have.been.calledWith('xyz', values);
});

test('Sets the form error to the value returned by mapErrorToMessage on error', () => {
  const confirmation = shallow(
    <Confirmation
      token="xyz"
      onSubmit={() => {
        throw new Error('error');
      }}
      mapErrorToMessage={() => 'you screwed up!'}
    />,
  );

  const values = {
    name: 'name',
    email: 'email@email.com',
    company: 'company',
    passwordA: 'password',
    passwordb: 'password',
  };

  confirmation.instance().onSubmit(values);

  confirmation.find('Form').should.have.prop('error', 'you screwed up!');
});

test('propagates additional props to outer element', () => {
  const extraProps = {
    onClick() {},
    className: 'hi',
    style: { margin: 0 },
  };

  shallow(<Confirmation {...extraProps} />).should.have.props(extraProps);
});
