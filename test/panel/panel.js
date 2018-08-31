import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Panel from '../../source/react/library/panel/Panel';

describe('<Panel />', () => {
  jsdom({ skipWindowCheck: true });

  it('should respond to remove link if onRemove provided', () => {
    const onRemove = sinon.spy();
    const wrapper = mount(<Panel onRemove={onRemove} />);

    wrapper.find('.rc-panel-remove').simulate('click');

    expect(onRemove.called).to.equal(true);
  });
});
