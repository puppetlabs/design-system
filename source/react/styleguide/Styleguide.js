import React from 'react';
import Sidebar from './Sidebar';
import Card from '../library/Card';
import Loading from '../library/LoadingIndicator';
import Button from '../library/Button';
import Icon from '../library/Icon';
import icons from '../library/icons';
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

  renderIcons() {
    const iconKeys = Object.keys(icons);

    return iconKeys.map(key => (
      <div className="icon-block">
        <Icon type={ key } />
        <div className="icon-block-title">{ key }</div>
      </div>
    ));
  }

  render() {
    const page = this.state;
    const popover = this.renderPopover();
    const icons = this.renderIcons();

    return (
      <div>
        <Sidebar />
        <div className="content">
          <Loading />
          <div className="section">
            <Card title="hello world!" />
          </div>
          <div className="section">
            <Button label="Bar" />
            <Button icon="plus" label="Add a thing" />
          </div>
          <div className="section">
            { icons }
          </div>
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
