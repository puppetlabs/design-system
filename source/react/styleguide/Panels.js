import React from 'react';
import StyleguideSection from './partials/StyleguideSection';
import Panel from '../library/Panel';

const Panels = () => (
  <div>
    <h1>Panels</h1>
    <StyleguideSection title="Default Panel">
      <Panel>
        I am a happy panel.
      </Panel>
    </StyleguideSection>
    <StyleguideSection title="Secondary Panel">
      <Panel secondary>
        I am a happy secondary panel.
      </Panel>
    </StyleguideSection>
  </div>
);

export default Panels;
