import React from 'react';
import { shallow } from 'enzyme';

import Sidebar from './Sidebar';

test('renders without crashing', () => {
  const requiredProps = {
    t: s => s,
    location: {
      pathname: '',
    },
  };

  shallow(<Sidebar t={s => s} {...requiredProps} />);
});
