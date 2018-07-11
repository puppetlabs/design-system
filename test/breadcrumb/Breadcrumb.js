import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import React from 'react';

import Breadcrumb from '../../source/react/library/breadcrumb';

describe('<Breadcrumb />', () => {
  it('should render without blowing up', () => {
    const wrapper = shallow(<Breadcrumb />);

    expect(wrapper.length).to.eql(1);
  });
});

describe('<Breadcrumb.Section />', () => {
  it('should render without blowing up', () => {
    const wrapper = shallow(<Breadcrumb.Section />);

    expect(wrapper.length).to.eql(1);
  });

  it('should not fire the onClick event when a section without a link is clicked', () => {
    const onClick = sinon.spy();
    const wrapper = shallow(<Breadcrumb.Section onClick={ onClick } />);
    wrapper.onClick = onClick;
    wrapper.simulate('click');

    expect(onClick.called).to.equal(false);
  });

  it('should fire the onClick event when a section with a link is clicked', () => {
    const onClick = sinon.spy();
    const wrapper = shallow(<Breadcrumb.Section onClick={ onClick } link route="test" />);
    wrapper.onClick = onClick;
    wrapper.simulate('click');

    expect(onClick.called).to.equal(true);
    expect(onClick.args[0][0]).to.equal('test');
  });
});

describe('<Breadcrumb.Separator />', () => {
  it('should render without blowing up', () => {
    const wrapper = shallow(<Breadcrumb.Separator />);

    expect(wrapper.length).to.eql(1);
  });

  it('should be able to change the icon used for the separator', () => {
    const wrapper = shallow(<Breadcrumb.Separator icon="chevron-left" />);

    expect(wrapper.find('Icon').prop('type')).to.eql('chevron-left');
  });
});
