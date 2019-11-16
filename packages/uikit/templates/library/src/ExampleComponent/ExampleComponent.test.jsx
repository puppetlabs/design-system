import React from 'react';
import { shallow } from 'enzyme';

import ExampleComponent from './ExampleComponent';

test('renders without crashing', () => {
  shallow(<ExampleComponent />);
});
