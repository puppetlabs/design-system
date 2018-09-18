import React from 'react';
import { shallow } from 'enzyme';

import Logo from './Logo';

test('renders without crashing', () => {
  shallow(<Logo />);
});
