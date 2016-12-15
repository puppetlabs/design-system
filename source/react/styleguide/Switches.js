
import React from 'react';
import StyleguideSection from './partials/StyleguideSection';
import Switch from '../library/Switch';

class Switches extends React.Component {

  render() {
    return (
      <div>
        <h1>Switches</h1>
        <StyleguideSection title="Open">
          <Switch
            name="foo"
            className="test-class"
            checked
            onChange={ () => console.log('switched!') }
          />
        </StyleguideSection>
        <StyleguideSection title="Closed">
          <Switch
            name="foo"
            className="test-class"
            checked={ false }
            onChange={ () => console.log('switched!') }
          />
        </StyleguideSection>
      </div>
    );
  }
}

export default Switches;
