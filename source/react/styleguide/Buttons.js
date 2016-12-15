import React from 'react';
import StyleguideSection from './partials/StyleguideSection';

import Button from '../library/Button';
import ButtonGroup from '../library/ButtonGroup';

const Buttons = () => (
  <div>
    <h1>Buttons</h1>
    <StyleguideSection title="Default Buttons">
      <Button label="default" />
      <Button disabled label="disabled" />
      <Button disabled processing label="processing" />
    </StyleguideSection>
    <StyleguideSection title="Secondary Buttons">
      <Button secondary label="default" />
      <Button secondary disabled label="disabled" />
      <Button secondary disabled processing label="processing" />
    </StyleguideSection>
    <StyleguideSection title="Transparent Buttons">
      <Button transparent label="default" />
      <Button transparent disabled label="disabled" />
      <Button transparent disabled processing label="processing" />
    </StyleguideSection>
    <StyleguideSection title="Button Groups">
      <ButtonGroup>
        <Button label="default" />
        <Button secondary label="secondary" />
      </ButtonGroup>
    </StyleguideSection>
    <StyleguideSection title="Floating Action Buttons">
      <Button floating />
      <Button floating disabled />
    </StyleguideSection>
  </div>
);

export default Buttons;
