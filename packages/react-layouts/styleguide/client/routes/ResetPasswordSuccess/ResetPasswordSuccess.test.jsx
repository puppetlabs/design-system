import React from 'react';
import { shallow } from 'enzyme';

import ResetPasswordSuccess from './ResetPasswordSuccess';

test('renders without crashing', () => {
  shallow(<ResetPasswordSuccess t={s => s} />);
});
