import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Pagenav from '../../source/react/library/pagenav/Pagenav';

describe.only('<Pagenav />', () => {
  const sections = [
    { label: 'Insights Scores', active: true },
    { label: 'Pipelines & Bottlenecks' },
    { label: 'Teams & Projects' },
  ];

  it('should render without blowing up', () => {
    const wrapper = shallow(<Pagenav />);

    expect(wrapper.length).to.eql(1);
  });

  it('should be fixed if prop is provided', () => {
    const wrapper = shallow(<Pagenav fixed />);

    expect(wrapper.hasClass('rc-pagenav-fixed')).to.eql(true);
  });


  it('should respond to click events if onClick provided', () => {
    const onClick = sinon.spy();
    const wrapper = mount(<Pagenav pageSections={ sections } onSectionClick={ onClick } />);

    wrapper.find('.rc-pagenav-link').first().simulate('click');

    expect(onClick.called).to.equal(true);
  });

  it('should properly render pageSections', () => {
    const wrapper = shallow(<Pagenav pageSections={ sections } />);

    expect(wrapper.find('.rc-pagenav-left').children().length).to.eql(3);
  });


  it('should apply an active state to a provided page section', () => {
    const wrapper = shallow(<Pagenav pageSections={ sections } />);

    expect(wrapper.find('.rc-pagenav-left').childAt(0).hasClass('rc-pagenav-link-active')).to.eql(true);
    expect(wrapper.find('.rc-pagenav-left').childAt(1).hasClass('rc-pagenav-link-active')).to.eql(false);
  });

  it('should properly render actions', () => {
    const actions = [
      <button key="button-1">Action 1</button>,
      <button key="button-2">Action 2</button>,
      <button key="button-3">Action 3</button>,
    ];
    const wrapper = shallow(<Pagenav actions={ actions } />);

    expect(wrapper.find('.rc-pagenav-right').children().length).to.eql(3);
  });
});
