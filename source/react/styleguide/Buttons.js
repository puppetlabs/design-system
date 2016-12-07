import React from 'react';
import Button from '../library/Button';

class Buttons extends React.Component {

  render() {
    return (
      <div>
        <h1>Buttons</h1>
        <Button size="small" label="small button" />
        <Button label="default button" />
        <Button size="large" label="large button" />
      </div>
    );
  }
}

export default Buttons;
