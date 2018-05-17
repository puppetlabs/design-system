import { string, element } from 'prop-types';
import React from 'react';
import { Route } from 'react-router-dom';

const ComponentRoute = ({ name, path, Component }) => (
  <Route key={name} path={`/components/${path}`} component={Component} />
);

ComponentRoute.propTypes = {
  name: string.isRequired,
  path: string.isRequired,
  Component: element.isRequired,
};

export default ComponentRoute;
