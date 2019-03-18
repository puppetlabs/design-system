import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from 'routes/NotFound';

/* eslint-disable jsx-a11y/alt-text */
const routes = [
  {
    path: '/',
    component: () => <img src="images/Overview@2x.png" width="1024" />,
  },
  {
    path: '/colors',
    component: () => <img src="images/Colors@2x.png" width="1024" />,
  },
  {
    path: '/typography',
    component: () => <img src="images/Typography@2x.png" width="1024" />,
  },
  {
    path: '/icons',
    component: () => (
      <img src="images/Icons%20and%20Logos@2x.png" width="1024" />
    ),
  },
  {
    path: '/alignments',
    component: () => <img src="images/Alignments@2x.png" width="1024" />,
  },
  {
    path: '/containers',
    component: () => <img src="images/Containers@2x.png" width="1024" />,
  },
  {
    path: '/components',
    component: () => <img src="images/Components@2x.png" width="1024" />,
  },
  {
    path: '/buttons',
    component: () => <img src="images/Buttons@2x.png" width="1024" />,
  },
  {
    path: '/forms',
    component: () => <img src="images/Forms@2x.png" width="1024" />,
  },
  {
    path: '/dialogs',
    component: () => <img src="images/Dialogues@2x.png" width="1024" />,
  },
  {
    path: '/uncategorized',
    component: () => <img src="images/Uncategorized@2x.png" width="1024" />,
  },
  {
    path: '/just-in-case',
    component: () => <img src="images/Just%20in%20case@2x.png" width="1024" />,
  },
  {
    path: '/navigation',
    component: () => <img src="images/Navigation@2x.png" width="1024" />,
  },
  {
    path: '/form-patterns',
    component: () => <img src="images/Form%20patterns@2x.png" width="1024" />,
  },
  {
    path: '/react-components',
    component: () => 'Puppet React Components',
  },
  {
    path: '/gui-text-guidelines',
    component: () => 'GUI text guidelines',
  },
];

export default () => (
  <Switch>
    {routes.map(route => (
      <Route key={route.path} exact {...route} />
    ))}
    <Route component={NotFound} />
  </Switch>
);
