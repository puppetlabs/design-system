import React from 'react';
import Switch from '../library/Switch';

class Switches extends React.Component {

  render() {
    return (
      <div>
        <h1>Switches</h1>
        <div className="sg-section">
        <h2 className="sg-section-title">Open</h2>
          <Switch
            name="foo"
            className="test-class"
            checked
            onChange={ () => console.log('switched!') }
          />
        </div>
        <div className="sg-section">
        <h2 className="sg-section-title">Closed</h2>
          <Switch
            name="foo"
            className="test-class"
            checked={ false }
            onChange={ () => console.log('switched!') }
          />
        </div>
      </div>
    );
  }
}

export default Switches;
