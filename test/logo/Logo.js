import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import React from 'react';

import Logo, { SUPPORTED_LOGOS } from '../../source/react/library/logo/Logo';

describe('<Logo />', () => {
  jsdom({ skipWindowCheck: true });

  it('renders each of the supported logos without crashing', () => {
    SUPPORTED_LOGOS.forEach(product => {
      shallow(<Logo product={product} />);
    });
  });

  it('renders each of the supported logo bugs without crashing', () => {
    SUPPORTED_LOGOS.forEach(product => {
      shallow(<Logo type="bug" product={product} />);
    });
  });

  it('applies inverted className with inverted prop', () => {
    expect(shallow(<Logo inverted product="insights" />)).to.have.className(
      'rc-logo-inverted',
    );
  });

  it('applies condensed className with condensed prop', () => {
    expect(shallow(<Logo condensed product="insights" />)).to.have.className(
      'rc-logo-condensed',
    );
  });

  it('propagates user provided className', () => {
    expect(
      shallow(<Logo product="insights" className="my-class" />),
    ).to.have.className('my-class');
  });

  it('provides a propType warning but does not break when an invalid product is requested', () => {
    try {
      shallow(<Logo product="hahahaha" />);
    } catch (e) {
      expect(e.message).to.contain('Failed prop type:');
    }
  });
});
