import React from 'react';
import { mount } from 'enzyme';

import PageTitle from './PageTitle';

test('renders a title heading', () => {
  mount(<PageTitle title="My Page" />).should.have.text('My Page');
});

test('conditionally renders a subtitle', () => {
  mount(
    <PageTitle title="My Page" subtitle="read all about it" />,
  ).should.include.text('read all about it');
});
