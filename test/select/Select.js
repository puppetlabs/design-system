import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';

import Select from '../../source/react/library/select/Select';

describe('<Select />', () => {
  const defaultProps = { name: 'selectySelect', disablePortal: true };

  it('should render without blowing up', () => {
    const wrapper = shallow(<Select {...defaultProps} />);

    expect(wrapper.length).to.eql(1);
  });

  it('should open on .rc-select-input click', () => {
    const options = ['Cats', 'Dogs'];
    const wrapper = mount(<Select options={options} {...defaultProps} />);

    expect(wrapper.find('MenuItem').length).to.eql(0);

    wrapper.find('.rc-select-input').simulate('click');

    expect(wrapper.find('MenuItem').length).to.eql(options.length);
  });

  context('options are objects', () => {
    const options = [
      { id: 'Michael', value: 'Michael', label: 'Sig' },
      { id: 'Geoff', value: 'Geoff', label: 'Catnasty' },
    ];

    it('should render the label', () => {
      const wrapper = mount(<Select options={options} {...defaultProps} />);

      wrapper.find('.rc-select-input').simulate('click');

      expect(
        wrapper
          .find('MenuList')
          .find('MenuItem')
          .first()
          .text(),
      ).to.eql('Sig');
      expect(
        wrapper
          .find('MenuList')
          .find('MenuItem')
          .last()
          .text(),
      ).to.eql('Catnasty');
    });

    it('should disable the selected option if the select is not clearable', () => {
      const optionsWithSelected = [
        { id: 'Coffee', value: 'Coffee', selected: true },
        { id: 'Tea', value: 'Tea' },
      ];
      const onChange = sinon.spy();
      const wrapper = mount(
        <Select
          onChange={onChange}
          options={optionsWithSelected}
          {...defaultProps}
        />,
      );

      wrapper.find('.rc-select-input').simulate('click');

      wrapper
        .find('.rc-menu-item-selected')
        .find('a')
        .simulate('click');

      expect(onChange.lastCall.args).to.eql([
        optionsWithSelected[0].value, // first arg is the current item
        optionsWithSelected[0], // second arg is the item that was selected...
      ]);
    });

    it('should select a single option when passed a selected prop that is a string', () => {
      const options = [
        { value: 'Michael', label: 'Sig' },
        { value: 'Geoff', label: 'Catnasty' },
      ];

      const wrapper = mount(
        <Select options={options} {...defaultProps} value="Michael" />,
      );

      expect(wrapper.find('Input').prop('value')).to.equal('Sig');
    });

    it('should select multiple options when passed a selected prop that is an arrray', () => {
      const options = [
        { value: 'Michael', label: 'Sig' },
        { value: 'Geoff', label: 'Catnasty' },
        { value: 'Colby', label: 'Colbs' },
      ];

      const wrapper = mount(
        <Select
          multiple
          options={options}
          {...defaultProps}
          value={['Michael', 'Geoff']}
        />,
      );

      const values = [];

      wrapper.find('SelectItem').forEach(Item => {
        values.push(Item.prop('value'));
      });

      expect(values.length).to.equal(2);
      expect(values.join(', ')).to.equal('Sig, Catnasty');
    });

    it('should allow selected objects to be selected and deselected by clicking on them', () => {
      const onChange = sinon.spy();
      const wrapper = mount(
        <Select
          clearable
          onChange={onChange}
          options={options}
          {...defaultProps}
        />,
      );

      wrapper.find('.rc-select-input').simulate('click');

      expect(wrapper.find('.rc-menu-item-selected').length).to.eql(0);

      wrapper
        .find('.rc-menu-item')
        .first()
        .find('a')
        .simulate('click');
      wrapper.find('.rc-select-input').simulate('click');

      expect(onChange.lastCall.args).to.eql([
        options[0].value, // first arg is the current item
        options[0], // second arg is the item that was selected...
      ]);

      expect(wrapper.find('.rc-menu-item-selected').length).to.eql(1);

      // Now we'll deselect that item
      wrapper
        .find('.rc-menu-item')
        .first()
        .find('a')
        .simulate('click');
      wrapper.find('.rc-select-input').simulate('click');

      expect(onChange.lastCall.args).to.eql([undefined, options[0]]);

      expect(wrapper.find('.rc-menu-item-selected').length).to.eql(0);
    });

    it('should emit the newly selected value onChange', () => {
      const onChange = sinon.spy();
      const wrapper = mount(
        <Select options={options} onChange={onChange} {...defaultProps} />,
      );

      wrapper.find('.rc-select-input').simulate('click');

      // The menu should be open now
      expect(wrapper.find('MenuItem').length).to.eql(2);

      wrapper
        .find('MenuItem')
        .first()
        .find('a')
        .simulate('click');

      expect(onChange.lastCall.args[0]).to.eql('Michael');

      // Now we close the menu
      expect(wrapper.find('MenuItem').length).to.eql(0);
    });
  });

  describe('typeahead', () => {
    it('should filter as the user types in the input', () => {
      const options = ['Company', 'Computer', 'Turtles'];
      const wrapper = mount(<Select options={options} {...defaultProps} />);

      wrapper.find('.rc-select-input').simulate('click');

      // Should be showing all the items by default
      expect(wrapper.find('MenuItem').length).to.eql(3);

      const input = wrapper.find('input');
      input.instance().value = 'Comp';
      input.simulate('change');

      // Only showing the matching items now
      expect(wrapper.find('MenuItem').length).to.eql(2);
    });
  });

  describe('clearable select', () => {
    it('should clear the value of the input', () => {
      const options = [{ value: 'Tea', label: 'Tea', selected: true }];
      const wrapper = mount(
        <Select options={options} {...defaultProps} clearable />,
      );

      expect(wrapper.find('Input').prop('value')).to.eql('Tea');

      wrapper
        .find('.rc-select-action')
        .first()
        .simulate('click');

      expect(wrapper.find('Input').prop('value')).to.eql('');
    });
  });

  describe('options are strings', () => {
    const options = ['Michael Phelps', 'Ryan Lochte'];

    it('should render the strings as labels', () => {
      const wrapper = mount(<Select options={options} {...defaultProps} />);

      wrapper.find('.rc-select-input').simulate('click');

      expect(
        wrapper
          .find('MenuList')
          .find('MenuItem')
          .first()
          .text(),
      ).to.eql('Michael Phelps');
      expect(
        wrapper
          .find('MenuList')
          .find('MenuItem')
          .last()
          .text(),
      ).to.eql('Ryan Lochte');
    });

    it('should emit the new value as a callback onChange', () => {
      const onChange = sinon.spy();
      const wrapper = mount(
        <Select options={options} onChange={onChange} {...defaultProps} />,
      );

      wrapper.find('.rc-select-input').simulate('click');

      // The menu should be open now
      expect(wrapper.find('MenuItem').length).to.eql(2);

      wrapper
        .find('MenuItem')
        .first()
        .find('a')
        .simulate('click');

      expect(onChange.lastCall.args[0]).to.eql('Michael Phelps');

      // Now we close the menu
      expect(wrapper.find('MenuItem').length).to.eql(0);
    });
  });

  it('should allow the options to be marked as not selectable', () => {
    const options = [
      { value: 'Tea', label: 'Tea' },
      { value: 'new', label: 'Add new drink', selectable: false },
    ];
    const wrapper = mount(<Select options={options} {...defaultProps} />);

    expect(wrapper.find('Input').prop('value')).to.eql('');

    wrapper.find('.rc-select-input').simulate('click');
    wrapper
      .find('MenuItem')
      .at(0)
      .find('a')
      .simulate('click');

    expect(wrapper.find('Input').prop('value')).to.eql('Tea');

    wrapper.find('.rc-select-input').simulate('click');
    wrapper
      .find('MenuItem')
      .at(1)
      .find('a')
      .simulate('click');

    // This should remain the same.
    expect(wrapper.find('Input').prop('value')).to.eql('Tea');
  });
});
