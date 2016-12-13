import React from 'react';
import StyleguideSection from './partials/StyleguideSection';
import Dropdown from '../library/dropdown/Dropdown';

const Dropdowns = () => {
  const options = [
    { id: '1', value: 'option 1' },
    { id: '2', value: 'option 2' },
  ];

  const dropdown = (
    <Dropdown
      label="I'm a dropdown"
      hint="I'm a hint"
      options={ options }
    />
  );

  return (
    <div>
      <h1>Dropdowns</h1>
      <StyleguideSection title="Default Dropdown">
        { dropdown }
      </StyleguideSection>
    </div>
  );
};

export default Dropdowns;
