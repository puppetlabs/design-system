import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import ButtonGroup from '../../source/react/library/buttons/ButtonGroup';

describe('<ButtonGroup />', () => {
  jsdom({ skipWindowCheck: true });

  it('should propagate user supplied className', () => {
    expect(
      shallow(
        <ButtonGroup href="/" className="my-class">
          ButtonGroup
        </ButtonGroup>,
      ),
    ).to.have.className('my-class');
  });

  it('should propagate all unrelated props', () => {
    const extraProps = {
      data: 'hi',
      method() {},
    };
    expect(
      shallow(<ButtonGroup {...extraProps}>ButtonGroup</ButtonGroup>),
    ).to.have.props(extraProps);
  });
});
