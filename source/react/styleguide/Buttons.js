import React from 'react';
import Button from '../library/Button';

class Buttons extends React.Component {

  render() {
    return (
      <div>
        <h1>Buttons</h1>
        <div className="sg-section">
          <h2 className="sg-section-title">Standard Buttons</h2>
          <Button label="default" />
          <Button secondary label="secondary" />
          <Button disabled label="disabled" />
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
