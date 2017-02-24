import React from 'react';
import StyleguideSection from './partials/StyleguideSection';
import Button from '../library/Button';
import Popover from '../library/Popover';

import Menu from '../library/menu/Menu';
import MenuHeader from '../library/menu/MenuHeader';
import MenuList from '../library/menu/MenuList';

class Menus extends React.Component {
  renderTarget() {
    return <Button>Open menu popover</Button>;
  }

  render() {
    const target = this.renderTarget();

    const listOptions = [
      { id: 0, value: 'option1' },
      { id: 1, value: 'option2' },
    ];

    return (
      <div>
        <h1>Menus</h1>
        <StyleguideSection title="Menu In Dropdown">
          <Popover target={ target } className="rc-popover-no-padding">
            <Menu>
              <MenuHeader title="I'm a happy menu title!" />
              <MenuList options={ listOptions }/>
            </Menu>
          </Popover>
        </StyleguideSection>
      </div>
    );
  }
}

export default Menus;
