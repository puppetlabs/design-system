import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import ButtonGroup from '../../source/react/library/buttons/ButtonGroup';

describe('<ButtonGroup />', () => {
  jsdom({ skipWindowCheck: true });

  it('should wrap children in a div', () => {
    const wrapper = shallow(
      <ButtonGroup>
        <span>hi</span>
      </ButtonGroup>,
    );

    expect(wrapper.find('.rc-button-group')).to.have.length(1);
  });
});
