import React from 'react';
import { shallow } from 'enzyme';

import Breadcrumb from '../../source/react/library/breadcrumb/Breadcrumb';

it('renders without crashing', () => {
  shallow(<Breadcrumb />);
});
