import React from 'react';
import Button from '../library/Button';

class Buttons extends React.Component {

  render() {
    return (
      <div>
        <h1>Buttons</h1>
        <Button label="default" />
        <Button secondary label="secondary" />
        <Button disabled label="disabled" />
      </div>
    );
  }
}

export default Buttons;
