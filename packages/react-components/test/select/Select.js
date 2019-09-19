import chai, { expect } from 'chai';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import React from 'react';
import Select from '../../source/react/library/select/Select';

const options = [
  { value: 'apple', label: 'apple' },
  { value: 'orange', label: 'orange' },
  { value: 'pear', label: 'pear' },
  { value: 'banana', label: 'banana' },
  { value: 'kiwi', label: 'kiwi' },
  { value: 'watermelon', label: 'watermelon' },
  { value: 'pineapple', label: 'pineapple' },
  { value: 'strawberry', label: 'strawberry' },
  { value: 'raspberry', label: 'raspberry' },
];

describe('<Select />', () => {
  it('should render without falling over', () => {
    const wrapper = shallow(<Select name="select-example-one" />);
    wrapper.unmount();
    expect(wrapper.length).to.equal(1);
  });

  it('should render options without falling over', () => {
    const wrapper = shallow(
      <Select name="select-example-one" options={options} />,
    );
    wrapper.unmount();
    expect(wrapper.length).to.equal(1);
  });

  it('should render when empty options is passed without falling over', () => {
    const emptyOptions = [];
    const wrapper = shallow(
      <Select name="select-example-one" options={emptyOptions} />,
    );
    wrapper.unmount();
    expect(wrapper.length).to.equal(1);
  });

  it('should render when options is passed non-existent keys', () => {
    const emptyOptions = [
      { value: 'value', label: 'label', fieldValue: 'fieldValue' },
    ];
    const wrapper = shallow(
      <Select name="select-example-one" options={emptyOptions} />,
    );
    wrapper.unmount();
    expect(wrapper.length).to.equal(1);
  });

  it('should respond to onBlur event', () => {
    const onBlur = sinon.spy(() => {});
    const wrapper = mount(<Select name="select-example-one" onBlur={onBlur} />);
    wrapper
      .find(Select)
      .props()
      .onBlur();
    expect(onBlur.called).to.equal(true);
    wrapper.unmount();
  });
});
