import React from 'react';
import Sidebar from './Sidebar';
import Card from '../library/Card';
import Loading from '../library/LoadingIndicator';
import Button from '../library/Button';
import Icon from '../library/Icon';
import Dropdown from '../library/dropdown/Dropdown';
import DropdownMenu from '../library/dropdown/DropdownMenu';

class Styleguide extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      page: 'Card',
      popoverOpen: false,
    };

    this.onClick = this.onClick.bind(this);
    this.onDropdownChange = this.onDropdownChange.bind(this);
  }

  onClick() {
    this.setState({ popoverOpen: !this.state.popoverOpen });
  }

  onDropdownChange(selected) {
consle.log(selected)
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
        <Dropdown
          selected="option 1"
          options={ ['option 1', 'option 2'] }
          onChange={ this.onDropdownChange }
        />
      </div>
    );
  }
}

export default Styleguide;
