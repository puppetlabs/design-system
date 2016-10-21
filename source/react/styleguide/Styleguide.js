import React from 'react';
import Sidebar from './Sidebar';
import Card from '../library/Card';
import Loading from '../library/LoadingIndicator';
import Button from '../library/Button';
import Icon from '../library/Icon';
import DropdownMenu from '../library/dropdown/DropdownMenu';

class Styleguide extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      page: 'Card',
      popoverOpen: false,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({ popoverOpen: !this.state.popoverOpen });
  }

  renderPopover() {
    let jsx;

    if (this.state.popoverOpen && this.target) {
      const options = ['users', 'companies'];

      jsx = <DropdownMenu target={ this.target } options={ options } />;
    }

    return jsx;
  }

  render() {
    const page = this.state;
    const popover = this.renderPopover();

    return (
      <div>
        <Sidebar />
        <div className="content">
          <Loading />
          <Card title="hello world!" />
          <Icon type="loader" />
          <Button label="Bar" />
          <Button
            ref={ (c) => { this.target = c; } }
            label="Popover"
            onClick={ this.onClick }
          />
          { popover }
        </div>
      </div>
    );
  }
}

export default Styleguide;
