import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Accordion from '../../source/react/library/accordion/Accordion';

describe('<Accordion />', () => {
  it('should render without blowing up', () => {
    const wrapper = shallow(<Accordion />);

    expect(wrapper.length).to.eql(1);
  });

  it('should optionally render a header', () => {
    const title = 'I\'m a fun Accordion';
    const wrapper = shallow(<Accordion title={ title } />);

    expect(wrapper.find('.rc-accordion-header').length).to.eql(1);
  });

  it('should render children', () => {
    const wrapper = shallow(
      <Accordion>
        <span>item1</span>
        <span>item2</span>
      </Accordion>,
    );

    expect(wrapper.find('.rc-accordion-items').children().length).to.eql(2);
  });

  describe('using autoOpen to open the first item', () => {
    const defaultProps = { autoOpen: true };

    it('should mark the first item as active', () => {
      const wrapper = shallow(
        <Accordion { ...defaultProps }>
          <span>hi1</span>
          <span>hi2</span>
        </Accordion>,
      );

      expect(wrapper.find('.rc-accordion-items').childAt(0).text()).to.eql('hi1');
      expect(wrapper.find('.rc-accordion-items').childAt(0).prop('active')).to.eql(true);
    });
  });
});
