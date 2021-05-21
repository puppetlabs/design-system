import '../setup';
import { expect } from 'chai';
import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import OptionMenuList from '../../source/react/internal/option-menu-list';
import OptionMenuListItem from '../../source/react/internal/option-menu-list/OptionMenuListItem';

import {
  DOWN_KEY_CODE,
  END_KEY_CODE,
  ENTER_KEY_CODE,
  HOME_KEY_CODE,
  SPACE_KEY_CODE,
  UP_KEY_CODE,
} from '../../source/react/constants';

// Example with option groups
const optionsWithGroups = [
  {
    label: 'fruits',
    value: [
      { value: 'peach', label: 'peach' },
      { value: 'pear', label: 'pear' },
      { value: 'apple', label: 'apple', disabled: true },
    ],
  },
  { label: 'none', value: 'none' },
  {
    label: 'berries',
    disabled: true,
    value: [
      { value: 'strawberry', label: 'strawberry' },
      { value: 'raspberry', label: 'raspberry' },
    ],
  },
  { label: 'any', value: 'any', disabled: true },
];

const lastIndex =
  optionsWithGroups.reduce(
    (total, opt) => total + (Array.isArray(opt.value) ? opt.value.length : 1),
    0,
  ) - 1;

// Example without option groups
const simpleOptions = [
  { label: 'almond', value: 'almond' },
  { label: 'hazelnut', value: 'hazelnut' },
  { label: 'walnut', value: 'walnut', disabled: true },
];

const getChoiceByText = (wrapper, text) =>
  wrapper.find(OptionMenuListItem).filterWhere(n => n.text() === text);

const getNthChoice = (wrapper, n) =>
  wrapper
    .find(OptionMenuListItem)
    .filterWhere(node => node.prop('type') !== 'heading')
    .at(n);

describe('<OptionMenuList />', () => {
  it('is empty when no options are provided', () => {
    const wrapper = shallow(<OptionMenuList id="test" />);
    expect(wrapper.isEmptyRender()).to.equal(true);
  });

  it('still renders when options are available but empty', () => {
    const wrapper = shallow(
      <OptionMenuList id="test" name="select-example-one" options={[]} />,
    );
    wrapper.unmount();
    expect(wrapper.length).to.equal(1);
  });

  it('renders array values as option groups', () => {
    const wrapper = shallow(<OptionMenuList id="test" options={optionsWithGroups} />);

    const group = wrapper.find('ul ul').first();
    const groupHeading = wrapper
      .find(OptionMenuListItem)
      .filterWhere(n => n.prop('type') === 'heading')
      .first();

    expect(group.prop('role')).to.equal('group');
    expect(group.prop('aria-labelledby')).to.equal(groupHeading.prop('id'));
  });

  it('focuses the first item by default', () => {
    const wrapper = shallow(
      <OptionMenuList id="test" options={simpleOptions} />,
    );
    const firstItem = wrapper.find(OptionMenuListItem).first();
    expect(firstItem.prop('focused')).to.equal(true);
    expect(firstItem.prop('selected')).to.equal(false);
    expect(
      wrapper
        .find('ul')
        .first()
        .prop('aria-activedescendant'),
    ).to.equal(firstItem.prop('id'));
  });

  it('focuses the first item by default (with option group)', () => {
    const wrapper = shallow(<OptionMenuList id="test" options={optionsWithGroups} />);
    const firstItem = wrapper
      .find(OptionMenuListItem)
      .filterWhere(n => n.prop('type') !== 'heading')
      .first();
    expect(firstItem.prop('focused')).to.equal(true);
    expect(firstItem.prop('selected')).to.equal(false);
    expect(
      wrapper
        .find('ul')
        .first()
        .prop('aria-activedescendant'),
    ).to.equal(firstItem.prop('id'));
  });

  it('does not allow focus on option group headings, but hovering over a heading removes existing focus', () => {
    const wrapper = shallow(
      <OptionMenuList
        id="test"
        options={optionsWithGroups}
        focusedIndex={0}
        selected="peach"
      />,
    );

    const getHeading = () =>
      wrapper
        .find(OptionMenuListItem)
        .filterWhere(n => n.prop('type') === 'heading')
        .first();

    expect(getChoiceByText(wrapper, 'peach').prop('focused')).to.equal(true);
    getHeading().simulate('mouseenter');
    expect(getChoiceByText(wrapper, 'peach').prop('focused')).to.equal(false);
    expect(getHeading().prop('focused')).to.equal(false);
  });

  it('allows focus but prevents select on disabled items', () => {
    const wrapper = shallow(<OptionMenuList id="test" options={optionsWithGroups} />);

    wrapper.find(OptionMenuListItem).filterWhere(n => n.value === 'any');
    getChoiceByText(wrapper, 'any').simulate('mouseenter');
    expect(getChoiceByText(wrapper, 'any').prop('focused')).to.equal(true);

    getChoiceByText(wrapper, 'any').simulate('click');
    expect(getChoiceByText(wrapper, 'any').prop('selected')).to.equal(false);

    getChoiceByText(wrapper, 'strawberry').simulate('mouseenter');
    expect(getChoiceByText(wrapper, 'strawberry').prop('focused')).to.equal(
      true,
    );

    getChoiceByText(wrapper, 'strawberry').simulate('click');
    expect(getChoiceByText(wrapper, 'strawberry').prop('selected')).to.equal(
      false,
    );
  });

  it('calls click handlers on click', () => {
    const onClick = sinon.spy();
    const onChange = sinon.spy();

    const wrapper = mount(
      <OptionMenuList
        id="test"
        options={optionsWithGroups}
        onClickItem={onClick}
        onChange={onChange}
      />,
    );

    getChoiceByText(wrapper, 'none').simulate('click');

    expect(onClick.calledOnce).to.equal(true);
    expect(onChange.calledWith('none')).to.equal(true);

    getChoiceByText(wrapper, 'pear').simulate('click');

    expect(onClick.calledTwice).to.equal(true);
    expect(onChange.calledWith('pear')).to.equal(true);
  });

  it('does not call click handlers when the clicked option is disabled', () => {
    const onClick = sinon.spy();
    const onChange = sinon.spy();

    const wrapper = mount(
      <OptionMenuList
        id="test"
        options={optionsWithGroups}
        onClickItem={onClick}
        onChange={onChange}
      />,
    );

    getChoiceByText(wrapper, 'any').simulate('click');
    getChoiceByText(wrapper, 'strawberry').simulate('click');

    expect(onClick.called).to.equal(false);
    expect(onChange.called).to.equal(false);
  });

  describe('keyboard navigation', () => {
    const pressKey = (wrapper, keyCode, times = 1) => {
      const eventObj = {
        keyCode,
        preventDefault: sinon.spy(),
        stopPropagation: sinon.spy(),
      };

      new Array(times).fill(null).forEach(() => {
        wrapper
          .find('ul')
          .first()
          .prop('onKeyDown')(eventObj);
      });

      return eventObj;
    };

    const MANY_TIMES = 8; // (more times than the number of focusable items in these examples)

    it('focuses the next item on down arrow', () => {
      const onFocusItem = sinon.spy();
      const wrapper = mount(
        <OptionMenuList
          id="test"
          options={optionsWithGroups}
          onFocusItem={onFocusItem}
        />,
      );

      expect(getNthChoice(wrapper, 0).prop('focused')).to.equal(true);

      pressKey(wrapper, DOWN_KEY_CODE);
      expect(onFocusItem.calledWith(1)).to.equal(true);
      expect(wrapper.state('focusedIndex')).to.equal(1);

      pressKey(wrapper, DOWN_KEY_CODE, MANY_TIMES);
      expect(wrapper.state('focusedIndex')).to.equal(lastIndex);
    });

    it('focuses the previous item on up arrow', () => {
      const onFocusItem = sinon.spy();
      const wrapper = mount(
        <OptionMenuList
          id="test"
          options={optionsWithGroups}
          onFocusItem={onFocusItem}
          focusedIndex={lastIndex}
        />,
      );

      expect(getNthChoice(wrapper, lastIndex).prop('focused')).to.equal(true);

      pressKey(wrapper, UP_KEY_CODE);
      expect(onFocusItem.calledWith(lastIndex - 1)).to.equal(true);
      expect(wrapper.state('focusedIndex')).to.equal(lastIndex - 1);

      pressKey(wrapper, UP_KEY_CODE, MANY_TIMES);
      expect(wrapper.state('focusedIndex')).to.equal(0);
    });

    it('focuses the top item on home', () => {
      const onFocusItem = sinon.spy();
      const wrapper = mount(
        <OptionMenuList
          id="test"
          options={optionsWithGroups}
          onFocusItem={onFocusItem}
          focusedIndex={3}
        />,
      );

      pressKey(wrapper, HOME_KEY_CODE);
      expect(wrapper.state('focusedIndex')).to.equal(0);
    });

    it('focuses the bottom item on end', () => {
      const onFocusItem = sinon.spy();
      const wrapper = mount(
        <OptionMenuList
          id="test"
          options={optionsWithGroups}
          onFocusItem={onFocusItem}
          focusedIndex={1}
        />,
      );

      pressKey(wrapper, END_KEY_CODE);
      expect(wrapper.state('focusedIndex')).to.equal(lastIndex);
    });

    it('calls click handlers for the focused item on enter or space', () => {
      const onClick = sinon.spy();
      const onChange = sinon.spy();

      const wrapper = mount(
        <OptionMenuList
          id="test"
          options={optionsWithGroups}
          onClickItem={onClick}
          onChange={onChange}
          focusedIndex={3}
        />,
      );

      pressKey(wrapper, ENTER_KEY_CODE);
      expect(onClick.calledOnce).to.equal(true);
      expect(onChange.calledWith('none')).to.equal(true);

      pressKey(wrapper, SPACE_KEY_CODE);
      expect(onClick.calledTwice).to.equal(true);
      expect(onChange.getCall(1).calledWithExactly('none')).to.equal(true);
    });

    it('does not call click handlers for a disabled item on enter or space', () => {
      const onClick = sinon.spy();
      const onChange = sinon.spy();

      const wrapper = mount(
        <OptionMenuList
          id="test"
          options={optionsWithGroups}
          onClickItem={onClick}
          onChange={onChange}
          focusedIndex={2}
        />,
      );

      pressKey(wrapper, ENTER_KEY_CODE);
      pressKey(wrapper, SPACE_KEY_CODE);

      expect(onClick.called).to.equal(false);
      expect(onChange.called).to.equal(false);
    });
  });

  describe('with multiple select', () => {
    it('sends all selected values to click handlers', () => {
      const onClick = sinon.spy();
      const onChange = sinon.spy();

      const wrapper = mount(
        <OptionMenuList
          id="test"
          options={optionsWithGroups}
          onClickItem={onClick}
          onChange={onChange}
          selected={['pear']}
          multiple
        />,
      );

      getChoiceByText(wrapper, 'peach').simulate('click');

      expect(onChange.calledWith(['pear', 'peach'])).to.equal(true);
      expect(onClick.calledOnce).to.equal(true);
    });

    it('toggles selection of an already selected value when it is clicked a second time', () => {
      const onClick = sinon.spy();
      const onChange = sinon.spy();

      const wrapper = mount(
        <OptionMenuList
          id="test"
          options={optionsWithGroups}
          onClickItem={onClick}
          onChange={onChange}
          selected={['peach', 'pear']}
          multiple
        />,
      );

      getChoiceByText(wrapper, 'pear').simulate('click');

      expect(onChange.calledWith(['peach'])).to.equal(true);
      expect(onClick.calledOnce).to.equal(true);
    });
  });
});
