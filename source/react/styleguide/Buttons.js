import React from 'react';
import Button from '../library/Button';

class Buttons extends React.Component {

  render() {
    return (
      <div>
        <h1>Buttons</h1>
        <div className="sg-section">
          <h2 className="sg-section-title">Standard Buttons</h2>

          <div className="sg-subsection">
            <h3 className="sg-subsection-title">Default</h3>
            <Button label="default" />
            <Button disabled label="disabled" />
            <Button disabled processing label="processing" />
          </div>

          <div className="sg-subsection">
            <h3 className="sg-subsection-title">Secondary</h3>
            <Button secondary label="default" />
            <Button secondary disabled label="disabled" />
            <Button secondary processing label="processing" />
          </div>

          <div className="sg-subsection">
            <h3 className="sg-subsection-title">Transparent</h3>
            <Button transparent label="default" />
            <Button transparent disabled label="disabled" />
            <Button transparent processing label="processing" />
          </div>
        </div>
        <div className="sg-section">
          <h2 className="sg-section-title">Floating Action Buttons</h2>
          <Button floating />
          <Button floating disabled />
        </div>
      </div>
    );
  }
}

export default Buttons;
