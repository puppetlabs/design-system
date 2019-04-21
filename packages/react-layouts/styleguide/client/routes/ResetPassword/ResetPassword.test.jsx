import React from 'react';
import { shallow } from 'enzyme';

import ResetPassword from './ResetPassword';

test('renders without crashing', () => {
  shallow(<ResetPassword t={s => s} history={{ push() {} }} />);
});
