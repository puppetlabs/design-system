import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Select from '../../source/react/library/select/Select';

describe('<Select />', () => {
  it('should render without blowing up', () => {
    const wrapper = shallow(<Select />);

    expect(wrapper.length).to.eql(1);
  });

  it('should open on click', () => {
    const options = ['Cats', 'Dogs'];
    const wrapper = shallow(<Select options={ options } />);

    expect(wrapper.find('.rc-select-menu-item').length).to.eql(0);

    wrapper.find('Input').simulate('click');

    expect(wrapper.find('.rc-select-menu-item').length).to.eql(options.length);
  });

  context('options are objects', () => {
    const options = [
      { value: 'Michael', label: 'Sig' },
      { value: 'Geoff', label: 'Catnasty' },
    ];

    it('should render the label', () => {
      const wrapper = shallow(<Select options={ options } />);

      wrapper.find('Input').simulate('click');

      expect(wrapper.find('.rc-select-menu').childAt(0).text()).to.eql('Sig');
      expect(wrapper.find('.rc-select-menu').childAt(1).text()).to.eql('Catnasty');
    });

    it('should emit the full object as a callback to onSelect', () => {
      const onSelect = sinon.spy();
      const wrapper = shallow(<Select options={ options } onSelect={ onSelect } />);

      wrapper.find('Input').simulate('click');

      // The menu should be open now
      expect(wrapper.find('.rc-select-menu-item').length).to.eql(2);

      wrapper.find('.rc-select-menu').childAt(0).simulate('mouseDown');

      expect(onSelect.lastCall.args).to.eql([{
        id: 0,
        value: 'Michael',
        label: 'Sig',
        selected: true,
      }]);

      // Now we close the menu
      expect(wrapper.find('.rc-select-menu-item').length).to.eql(0);
    });
  });

  describe('options are strings', () => {
    const options = ['Michael Phelps', 'Ryan Lochte'];

    it('should render the strings as labels', () => {
      const wrapper = shallow(<Select options={ options } />);

      wrapper.find('Input').simulate('click');

      expect(wrapper.find('.rc-select-menu').childAt(0).text()).to.eql('Michael Phelps');
      expect(wrapper.find('.rc-select-menu').childAt(1).text()).to.eql('Ryan Lochte');
    });

    it('should emit the option as an object as a callback to onSelect', () => {
      const onSelect = sinon.spy();
      const wrapper = shallow(<Select options={ options } onSelect={ onSelect } />);

      wrapper.find('Input').simulate('click');

      // The menu should be open now
      expect(wrapper.find('.rc-select-menu-item').length).to.eql(2);

      wrapper.find('.rc-select-menu').childAt(0).simulate('mouseDown');

      expect(onSelect.lastCall.args).to.eql([{
        id: 'Michael Phelps',
        value: 'Michael Phelps',
        label: 'Michael Phelps',
        selected: true,
      }]);

      // Now we close the menu
      expect(wrapper.find('.rc-select-menu-item').length).to.eql(0);
    });
  });
});
