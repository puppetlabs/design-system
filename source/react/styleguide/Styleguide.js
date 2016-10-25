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
    };
  }

  renderPopover() {
    const options = [{ id: 1, value: 'users' }, { id: 2, value: 'companies' }];
    const button = <Button type="button" label="Popover" />;

    return <DropdownMenu width="200px" target={ button } options={ options } />;
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
        </div>
        { popover }
        <Dropdown
          hint="Select Field"
          multiple={ true }
          selected={ 1 }
          options={ [
            { id: 1, value: 'option 1' },
            { id: 2, value: 'option 2' },
            { id: 3, value: 'option 3' },
            { id: 4, value: 'option 4' },
          ] }
        />
      </div>
    );
  }
}

export default Styleguide;
