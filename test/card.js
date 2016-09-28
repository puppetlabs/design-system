import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Card from '../source/react/Card';

describe('<Card />', () => {
  jsdom();

  const wrapper = shallow(<Card />);

  xit('should be pending', () => {

  });
});
