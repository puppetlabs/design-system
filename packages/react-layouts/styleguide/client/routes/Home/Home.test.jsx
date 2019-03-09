import React from 'react';
import { shallow } from 'enzyme';

import Home from './Home';

test('renders without crashing', () => {
  const requiredProps = {
    t: s => s,
  };

  shallow(<Home {...requiredProps} />);
});
