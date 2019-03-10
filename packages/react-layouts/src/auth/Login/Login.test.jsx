import React from 'react';
import { shallow } from 'enzyme';

import Login from './Login';

const requiredProps = {
  product: 'insights',
};

test('renders without crashing', () => {
  shallow(<Login {...requiredProps} />);
});
