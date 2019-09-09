import { configure } from '@storybook/react';
import '../src/table/Table.scss'

const req = require.context('../stories', true, /\.stories\.jsx$/);

function loadStories() {
    req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);