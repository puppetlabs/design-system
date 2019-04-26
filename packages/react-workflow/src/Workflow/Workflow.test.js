import React from 'react';
import { shallow } from 'enzyme';

import Workflow from './Workflow';

test('renders without crashing', () => {
  shallow(<Workflow />);
});
