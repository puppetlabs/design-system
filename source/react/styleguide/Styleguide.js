import React from 'react';
import Sidebar from './Sidebar';
import Card from '../library/Card';
import Loading from '../library/LoadingIndicator';
import Button from '../library/Button';
import Icon from '../library/Icon';

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
        <Sidebar />
        <div className="content">
          <Loading />
          <Card title="hello world!" />
          <Icon type="loader" />
          <Button type="submit" block loading label="Bar" />
        </div>
      </div>
    );
  }
}

export default Styleguide;
