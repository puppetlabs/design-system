import '../setup';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import React, { useState } from 'react';
import Input from '../../source/react/library/input/Input';
import Select from '../../source/react/library/select/Select';
import SelectTarget from '../../source/react/library/select/SelectTarget';
import OptionMenuList from '../../source/react/internal/option-menu-list';
import OptionMenuListItem from '../../source/react/internal/option-menu-list/OptionMenuListItem';

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
  {
    label: 'herbs',
    value: [
      { label: 'basil', value: 'basil' },
      { label: 'parsley', value: 'parsley' },
      { label: 'thyme', value: 'thyme' },
    ],
  },
];

// eslint-disable-next-line react/prop-types
const ExampleSelect = ({ value: initialValue, ...props }) => {
  const [value, setValue] = useState(initialValue || null);

  return (
    <Select
      name="test"
      value={value}
      onChange={(val) => {
        setValue(val);
      }}
      open
      {...props}
    />
  );
};

const getChoiceByText = (wrapper, name) =>
  wrapper
    .find(OptionMenuListItem)
    .filterWhere((n) => n.text() === name)
    .first();

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
    wrapper.find(Select).props().onBlur();
    expect(onBlur.called).to.equal(true);
    wrapper.unmount();
  });

  it('starts with the listbox closed and shows it when the target button is clicked', () => {
    const wrapper = mount(<Select name="test" options={options} />);
    expect(wrapper.find(Select).state('open')).to.equal(false);

    const menu = wrapper.find(OptionMenuList);
    expect(menu.prop('aria-labelledby')).to.equal('test-label');
    expect(menu.prop('role')).to.equal('listbox');

    const target = wrapper.find(SelectTarget);
    expect(target.prop('aria-controls')).to.equal('test-menu');
    expect(target.prop('aria-haspopup')).to.equal('listbox');
    expect(target.prop('aria-expanded')).to.equal(false);

    target.find('button').simulate('click');

    expect(wrapper.find(SelectTarget).prop('aria-expanded')).to.equal(true);
    expect(wrapper.find(Select).state('open')).to.equal(true);
  });

  it('selects an option on click', () => {
    const wrapper = mount(<ExampleSelect name="test" options={options} open />);

    getChoiceByText(wrapper, 'kiwi').simulate('click');
    expect(wrapper.find(Select).state('open')).to.equal(false);
    expect(wrapper.find(OptionMenuList).prop('selected')).to.equal('kiwi');
    expect(wrapper.find('input').prop('value')).to.equal('kiwi');
    expect(wrapper.find(SelectTarget).text()).to.equal('kiwi');
    wrapper.find(SelectTarget).simulate('click');

    getChoiceByText(wrapper, 'parsley').simulate('click');
    expect(wrapper.find(OptionMenuList).prop('selected')).to.equal('parsley');
    expect(wrapper.find('input').prop('value')).to.equal('parsley');
    expect(wrapper.find(SelectTarget).text()).to.equal('parsley');
  });

  it('does _not_ deselect the option on second click', () => {
    const wrapper = mount(<ExampleSelect name="test" options={options} open />);

    getChoiceByText(wrapper, 'kiwi').simulate('click');
    wrapper.find(SelectTarget).simulate('click');
    getChoiceByText(wrapper, 'kiwi').simulate('click');

    expect(wrapper.find(OptionMenuList).prop('selected')).to.equal('kiwi');
    expect(wrapper.find('input').prop('value')).to.equal('kiwi');
    expect(wrapper.find(SelectTarget).text()).to.equal('kiwi');
  });

  it('displays option groups with headings correctly in the rendered listbox', () => {
    const wrapper = mount(<Select name="test" options={options} />);
    const list = wrapper.find('ul ul');
    const headingItem = list.find(OptionMenuListItem).first();
    expect(headingItem.prop('type')).to.equal('heading');
  });

  describe('with multiselect', () => {
    const getApplyButton = (wrapper) =>
      wrapper
        .find('button')
        .filterWhere((n) => n.text() === 'Apply')
        .first();

    it('allows selection of multiple items on click + Apply', () => {
      const wrapper = mount(
        <ExampleSelect name="test" options={options} type="multiselect" open />,
      );
      const selections = ['banana', 'parsley', 'kiwi', 'thyme'];

      selections.forEach((item) => {
        getChoiceByText(wrapper, item).simulate('click');
      });
      getApplyButton(wrapper).simulate('click');

      expect(wrapper.find(OptionMenuList).prop('selected')).to.eql(selections);
      expect(wrapper.find('input').prop('value')).to.eql(selections);
      expect(wrapper.find(SelectTarget).text()).to.equal(
        selections.sort().join(', '),
      );
    });

    it('deselects a selected item on second click + Apply', () => {
      const wrapper = mount(
        <ExampleSelect name="test" options={options} type="multiselect" open />,
      );
      const selections = ['banana', 'parsley', 'kiwi', 'thyme'];
      selections.forEach((choice) => {
        getChoiceByText(wrapper, choice).simulate('click');
      });
      getApplyButton(wrapper).simulate('click');
      wrapper.find(SelectTarget).simulate('click');

      [selections.shift(), selections.shift()].forEach((choice) => {
        getChoiceByText(wrapper, choice).simulate('click');
      });
      getApplyButton(wrapper).simulate('click');

      expect(wrapper.find(OptionMenuList).prop('selected')).to.eql(selections);
      expect(wrapper.find(SelectTarget).text()).to.equal(
        selections.sort().join(', '),
      );
      expect(wrapper.find('input').prop('value').sort()).to.eql(
        selections.sort(),
      );
    });

    it('applies selections without requiring the Apply button when applyImmediately is set', () => {
      const wrapper = mount(
        <ExampleSelect
          name="test"
          options={options}
          type="multiselect"
          applyImmediately
          open
        />,
      );

      getChoiceByText(wrapper, 'kiwi').simulate('click');

      expect(wrapper.find(OptionMenuList).prop('selected')).to.eql(['kiwi']);
      expect(wrapper.find(SelectTarget).text()).to.equal('kiwi');
      expect(wrapper.find('input').prop('value')).to.eql(['kiwi']);
    });
  });
});
