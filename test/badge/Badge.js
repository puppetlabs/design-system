import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Badge from '../../source/react/library/badge/Badge';

describe('<Badge />', () => {
  jsdom({ skipWindowCheck: true });

  it('should render the children provided', () => {
    expect(shallow(<Badge>hello world!</Badge>)).to.have.text('hello world!');
  });
});
