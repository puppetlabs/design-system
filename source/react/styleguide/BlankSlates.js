import React from 'react';
import { Link } from 'react-router';
import StyleguideSection from './partials/StyleguideSection';
import BlankSlate from '../library/BlankSlate';

const BlankSlates = () => {
  const jsx = (
    <div>
      <span>You have not added any views. You need to </span>
      <Link to="blankslates">add a view</Link>
      <span> to add visualizations.</span>
    </div>
  );

  return (
    <div className="blank-slates-styleguide">
      <StyleguideSection title="Blank Slates" >
        <BlankSlate icon="views" message={ jsx } />
      </StyleguideSection>
    </div>
  );
};

export default BlankSlates;
