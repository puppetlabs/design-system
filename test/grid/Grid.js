import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Grid from '../../source/react/library/grid';

describe('<Grid />', () => {
  it('should render without blowing up', () => {
    const wrapper = shallow(<Grid>children</Grid>);

    expect(wrapper.length).to.eql(1);
  });
});

describe('<Grid.Row />', () => {
  it('should render without blowing up', () => {
    const wrapper = shallow(<Grid.Row>children</Grid.Row>);

    expect(wrapper.length).to.eql(1);
  });
});

describe('<Grid.Column />', () => {
  it('should render without blowing up', () => {
    const wrapper = shallow(<Grid.Column>children</Grid.Column>);

    expect(wrapper.length).to.eql(1);
  });
});
