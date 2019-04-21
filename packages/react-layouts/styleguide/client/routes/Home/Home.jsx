import React from 'react';
import { Heading, Text } from '@puppet/react-components';

import './Home.scss';

const Home = () => (
  <div className="home">
    <Heading className="home-title">Puppet React Layouts</Heading>
    <Text>
      A collection of reusable pages and layouts for the Puppet Design System
    </Text>
  </div>
);

export default Home;
