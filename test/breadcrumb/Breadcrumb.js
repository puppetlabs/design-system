import React from 'react';
import { shallow } from 'enzyme';

import Breadcrumb from '../../source/react/library/breadcrumb/Breadcrumb';

test('renders without crashing', () => {
  shallow(<Breadcrumb />);
});
