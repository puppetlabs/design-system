import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Gravatar from '../../source/react/library/gravatar/Gravatar';

describe('<Gravatar />', () => {
  jsdom({ skipWindowCheck: true });

  it('should render an image', () => {
    expect(shallow(<Gravatar />).find('img').length).to.eql(1);
  });
});
