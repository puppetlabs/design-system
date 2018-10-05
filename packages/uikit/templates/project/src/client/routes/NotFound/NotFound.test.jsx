import React from 'react';
import { shallow } from 'enzyme';

import NotFound from './NotFound';

test('renders without crashing', () => {
  shallow(<NotFound />);
});
