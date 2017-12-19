import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import ListItem from '../../source/react/library/list/ListItem';

describe('<ListItem />', () => {
  jsdom({ skipWindowCheck: true });

  it('should respond to click events if onClick provided', () => {
    const onClick = sinon.spy();
    const wrapper = shallow(<ListItem onClick={ onClick } />);

    wrapper.find('.rc-list-item-link').simulate('click');

    expect(onClick.called).to.equal(true);
  });

  it('should respond to remove link if onRemove provided', () => {
    const onRemove = sinon.spy();
    const wrapper = shallow(<ListItem onRemove={ onRemove } />);

    wrapper.find('.rc-list-item-remove').simulate('click');

    expect(onRemove.called).to.equal(true);
  });

  it('should respond to edit link if onEdit provided', () => {
    const onEdit = sinon.spy();
    const wrapper = shallow(<ListItem onEdit={ onEdit } />);

    wrapper.find('.rc-list-item-edit').simulate('click');

    expect(onEdit.called).to.equal(true);
  });

  it('should accept a classname prop', () => {
    const wrapper = shallow(<ListItem className="list-items-rule" />);

    expect(wrapper.hasClass('list-items-rule'));
  });

  it('should accept a selected prop', () => {
    const wrapper = shallow(<ListItem selected />);

    expect(wrapper.hasClass('rc-list-item-selected'));
  });

  it('should accept a tooltip prop and render a tooltip', () => {
    const wrapper = shallow(<ListItem tooltip="test">hi!</ListItem>);

    expect(wrapper.find('TooltipHoverArea').length).to.eql(1);
  });
});
