import React from 'react';
import Card from '../library/Card';
import Loading from '../library/LoadingIndicator';
import Button from '../library/Button';

class Styleguide extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      page: 'Card',
    };
  }

  render() {
    const page = this.state;

    return (
      <div>
        <Loading />
        <Card title="hello world!" />
        <Button type="submit" label="Bar" />
      </div>
    );
  }
}

export default Styleguide;
