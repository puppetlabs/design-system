import React from 'react';
import StyleguideSection from './partials/StyleguideSection';
import Button from '../library/Button';
import Popover from '../library/Popover';

import Menu from '../library/menu/Menu';
import MenuHeader from '../library/menu/MenuHeader';

class Menus extends React.Component {
  renderTarget() {
    return <Button>Open menu popover</Button>;
  }

  render() {
    const target = this.renderTarget();

    return (
      <div>
        <h1>Menus</h1>
        <StyleguideSection title="Menu In Dropdown">
          <Popover target={ target }>
            <Menu>
              <MenuHeader title="I'm a happy menu!" />
            </Menu>
          </Popover>
        </StyleguideSection>
      </div>
    );
  }
}

export default Menus;
