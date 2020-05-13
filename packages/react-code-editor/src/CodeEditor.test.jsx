import React from 'react';
import { shallow } from 'enzyme';

import CodeEditor from './CodeEditor';

test('renders without crashing', () => {
  shallow(<CodeEditor />);
});
