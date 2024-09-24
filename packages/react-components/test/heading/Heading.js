import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Heading from '../../source/react/library/heading/Heading';

describe('<Heading />', () => {
  jsdom({ skipWindowCheck: true });

  it('should render without blowing up', () => {
    shallow(<Heading>Heading</Heading>);
  });

  it('should render the appropiate html element via the as prop', () => {
    const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    let matches = 0;

    headings.forEach((elem) => {
      const wrapper = shallow(<Heading as={elem}>Heading</Heading>);

      if (wrapper.find(elem).length === 1) {
        matches += 1;
      }
    });

    expect(matches).to.eql(headings.length);
  });
});
