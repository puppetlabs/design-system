import React from 'react';
import { shallow } from 'enzyme';

import ForgotPasswordSent from './ForgotPasswordSent';

test('renders without crashing', () => {
  shallow(<ForgotPasswordSent t={s => s} />);
});
