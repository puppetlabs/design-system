import jsdom from 'mocha-jsdom';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import React from 'react';

import Tag from '../../source/react/library/tag/Tag';

describe('<Tag />', () => {
  jsdom({ skipWindowCheck: true });

  it('should render without blowing up', () => {
    shallow(<Tag label="Text" />);
  });

  it('should display the correct label text', () => {
    expect(
      shallow(<Tag label="Text" />)
        .find('Text.rc-tag-text')
        .text(),
    ).to.have.string('Text');
  });

  it('should call onClick function when close button is clicked', () => {
    const onClick = sinon.spy();
    const wrapper2 = mount(<Tag label="Text" onClick={onClick} />);

    wrapper2.find('button').simulate('click');

    expect(onClick.called).to.equal(true);
  });

  it('should render the neutral tag when correct type is passed', () => {
    const wrapper = shallow(<Tag label="Text" type="neutral" />);

    expect(wrapper.hasClass('rc-tag-neutral')).to.equal(true);
  });
});
