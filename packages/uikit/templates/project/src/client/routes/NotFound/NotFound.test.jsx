import React from 'react';
import { shallow } from 'enzyme';

import NotFound from './NotFound';

test('renders without crashing', () => {
  const requiredProps = {
    t: s => s,
  };

  shallow(<NotFound {...requiredProps} />);
});
