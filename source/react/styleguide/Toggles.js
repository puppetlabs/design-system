import React from 'react';
import StyleguideSection from './partials/StyleguideSection';
import Toggle from '../library/Toggle';

class TogglesPage extends React.Component {

  render() {
    return (
      <div>
        <h1>Toggles</h1>
        <StyleguideSection title="Toggles">
          <Toggle
            left="option 1"
            right="option 2"
            onChange={ option => console.log(`${option} selected`) }
          />
        </StyleguideSection>
      </div>
    );
  }
}

export default TogglesPage;
