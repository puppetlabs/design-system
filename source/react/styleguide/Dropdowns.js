import React from 'react';
import StyleguideSection from './partials/StyleguideSection';
import Button from '../library/Button';
import Dropdown from '../library/dropdown/Dropdown';
import DropdownMenu from '../library/dropdown/DropdownMenu';
import DropdownLabel from '../library/dropdown/DropdownLabel';

const Dropdowns = () => {
  const options = [
    { id: 1, value: 'option 1' },
    { id: 2, value: 'option 2' },
  ];

  const dropdown = (
    <Dropdown
      label="I'm a dropdown"
      hint="I'm a hint"
      options={ options }
    />
  );

  const tinyDropdown = (
    <Dropdown
      label="I'm a tiny dropdown"
      size="tiny"
      hint="I'm a hint"
      options={ options }
    />
  );

  const dropdownWithoutPortal = (
    <Dropdown
      label="I'm a dropdown"
      hint="I'm a hint"
      disablePortal
      options={ options }
    />
  );

  const multiple = (
    <Dropdown
      multiple
      label="I'm a multi-dropdown"
      hint="I'm a hint"
      selected={ [1] }
      options={ options }
      onChange={ () => {} }
    />
  );

  const menuTarget = <Button label="Toggle Dropdown" />;

  const blank = (
    <DropdownMenu
      target={ menuTarget }
      hint="I'm a hint"
      options={ [] }
      blank="Congratulations! You've added all the things!"
    />
  );

  return (
    <div>
      <h1>Dropdowns</h1>
      <StyleguideSection title="Default Dropdown">
        { dropdown }
        <br />
        { tinyDropdown }
      </StyleguideSection>
      <StyleguideSection title="Dropdown outside portal">
        { dropdownWithoutPortal }
      </StyleguideSection>
      <StyleguideSection title="Multiple Dropdown">
        { multiple }
      </StyleguideSection>
      <StyleguideSection title="Blank Slate Dropdown">
        { blank }
      </StyleguideSection>
      <StyleguideSection title="Select Style Dropdown Label">
        <DropdownLabel select label="I am a label" />
      </StyleguideSection>
    </div>
  );
};

export default Dropdowns;
