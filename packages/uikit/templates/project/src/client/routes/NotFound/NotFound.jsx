import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Heading } from '@puppet/react-components';
import './NotFound.scss';

const NotFound = () => (
  <div className="route-not-found">
    <Heading as="h1">Page not found</Heading>
    <Button as={Link} to="/">
      Go home
    </Button>
  </div>
);

export default NotFound;
