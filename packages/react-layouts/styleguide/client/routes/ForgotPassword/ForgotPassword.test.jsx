import React from 'react';
import { shallow } from 'enzyme';

import ForgotPassword from './ForgotPassword';

test('renders without crashing', () => {
  shallow(<ForgotPassword t={s => s} />);
});
