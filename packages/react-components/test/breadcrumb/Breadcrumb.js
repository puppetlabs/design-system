import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';

import Breadcrumb from '../../source/react/library/breadcrumb/Breadcrumb';
import Link from '../../source/react/library/link/Link';
import Text from '../../source/react/library/text/Text';

describe('<Breadcrumb />', () => {
  const labels = ['items', '11', 'details'];
  const sections = [
    <Breadcrumb.Section href="https://www.puppet.com" key={labels[0]}>
      {labels[0]}
    </Breadcrumb.Section>,
    <Breadcrumb.Section href="https://www.puppet.com" key={labels[1]}>
      {labels[1]}
    </Breadcrumb.Section>,
    <Breadcrumb.Section key={labels[2]}>{labels[2]}</Breadcrumb.Section>,
  ];

  it('renders without crashing', () => {
    shallow(<Breadcrumb />);
  });

  it('renders a Link component for all sections except the last (which renders a Text component)', () => {
    const wrapper = mount(<Breadcrumb>{sections}</Breadcrumb>);

    expect(
      wrapper
        .find(Link)
        .first()
        .text(),
    ).to.equal(labels[0]);

    expect(
      wrapper
        .find(Link)
        .at(1)
        .text(),
    ).to.equal(labels[1]);

    expect(wrapper.find(Text).text()).to.equal(labels[2]);
  });

  it('renders default back type correctly', () => {
    const wrapper = mount(<Breadcrumb type="back" />);
    expect(
      wrapper
        .find(Link)
        .first()
        .text(),
    ).to.equal('Back');
  });

  it('renders backLabel type correctly', () => {
    const wrapper = mount(<Breadcrumb type="back" backLabel="Back to nodes" />);
    expect(
      wrapper
        .find(Link)
        .first()
        .text(),
    ).to.equal('Back to nodes');
  });
});
