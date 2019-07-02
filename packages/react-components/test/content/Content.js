import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Content from '../../source/react/library/content/Content';

describe('<Content />', () => {
  jsdom({ skipWindowCheck: true });

  it('should render with a content class', () => {
    const wrapper = shallow(
      <Content>
        <p>Hello!</p>
      </Content>,
    );

    expect(wrapper).to.have.className('rc-content');
  });
});
