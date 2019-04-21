import React from 'react';
import { shallow } from 'enzyme';

import Confirmation from './Confirmation';

test('renders without crashing', () => {
  shallow(<Confirmation t={s => s} history={{ push() {} }} />);
});
