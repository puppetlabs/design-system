## Overview

Use the `Menu` component to display customized popup menus. This component uses [React context](https://reactjs.org/docs/context.html) in conjunction with a collection of sub components to provide a flexible pattern for creating menus that differ in design and functionality to the [`ButtonSelect`](#/React%20Components/ButtonSelect) & [`ActionSelect`](#/React%20Components/ActionSelect) menus. Where possible, its still recommended to use [`ButtonSelect`](#/React%20Components/ButtonSelect) & [`ActionSelect`](#/React%20Components/ActionSelect) components to maintain visual consistency.

Similar to the [`Tooltip`](#/React%20Components/Tooltip), the `Menu` component utilizes the [popper.js](https://popper.js.org/) library for most of its positioning and display functionality.

## Basic Use

To control the menu, pass a boolean value to the `open` prop of the `Menu.Container` component. Event handlers for the menu can be passed to the `onBlur`, `onEscape` props.

```jsx
import Heading from '../heading';
import Button from '../button';
const [option, setOption] = React.useState();
const [open, setMenu] = React.useState(false);
const exampleStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: '4px',
  gap: '4px',
};
const buttonStyle = { margin: '0px' };

const closeMenu = () => setMenu(false);
const openMenu = () => setMenu(true);
const closeOnSelect = opt => {
  setOption(opt);
  closeMenu();
};

<div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
  <Heading as="h5">{option}</Heading>
  <Menu>
    <Menu.Trigger onClick={openMenu}>Open Menu</Menu.Trigger>
    <Menu.Container
      onBlur={closeMenu}
      onEscape={closeMenu}
      open={open}
      style={exampleStyle}
    >
      <Button
        style={buttonStyle}
        type="transparent"
        onClick={() => setOption('controlled ex1')}
      >
        Example 1
      </Button>
      <Button
        style={buttonStyle}
        type="transparent"
        onClick={() => closeOnSelect('controlled ex2')}
      >
        Example 2
      </Button>
      <Button
        style={buttonStyle}
        type="transparent"
        onClick={() => closeOnSelect('controlled ex3')}
      >
        Example 3
      </Button>
    </Menu.Container>
  </Menu>
</div>;
```

## Managing Menu Items

### Menu.Item

To improve accessibility and event handling, the `Menu` component provides the `Menu.Item` [HOC](https://reactjs.org/docs/higher-order-components.html) for managing its internal focusable elements and adding common event handlers. To use, wrap any component that accepts an `innerRef` prop with the `Menu.Item` function.

### Focus

`Menu.Item` uses the 'roving focus' pattern and is meant to be used for simple menu navigation. The tab index will be tracked automatically according to its x/y location on the page. For more complex menus, it's recommended you add your own focus management.

### Controlled vs Uncontrolled

`Menu.Item` will add basic open and close handlers, allowing for a simple uncontrolled menu. `onKeydown` events for the space & enter key will be added to match the onClick event provided to the menu item component.

_To control the menu while using components wrapped in the `Menu.Item` HOC, pass a boolean value to the `open` prop. Setting `closeOnSelect` to false will keep the menu open after selections are made_

```jsx
import Heading from '../heading';
import Detail from '../detail';
import Button from '../button';

const [option, setOption] = React.useState();
const [openControlledMenu, setControlledMenu] = React.useState(false);
const exampleStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'base-line',
  padding: '4px',
  gap: '4px',
};
const buttonStyle = { margin: '0px' };

const MenuItem = Menu.Item(({ inputRef, ...props }) => (
  <Button ref={inputRef} style={buttonStyle} type="transparent" {...props} />
));

const closeMenu = () => setControlledMenu(false);
const closeOnSelect = opt => {
  setOption(opt);
  closeMenu();
};

<div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
  <Heading as="h5">{option}</Heading>
  <Menu>
    <Menu.Trigger style={{ display: 'block', maxHeight: '36px' }}>
      Uncontrolled
    </Menu.Trigger>
    <Menu.Container style={exampleStyle}>
      <MenuItem onClick={() => setOption('ex1')}>Example 1</MenuItem>
      <MenuItem onClick={() => setOption('ex2')}>Example 2</MenuItem>
      <MenuItem onClick={() => setOption('ex3')}>Example 3</MenuItem>
    </Menu.Container>
  </Menu>
  <Menu>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <>
        <button onClick={() => setControlledMenu(true)}>Open</button>
        <button onClick={() => setControlledMenu(false)}>Close</button>
      </>
      <Menu.Trigger onClick={() => console.log('Use the open button.')}>
        Controlled
      </Menu.Trigger>
    </div>
    <Menu.Container
      onBlur={closeMenu}
      onEscape={closeMenu}
      open={openControlledMenu}
      closeOnSelect={false}
      style={exampleStyle}
    >
      <MenuItem onClick={() => setOption('controlled ex1')}>Example 1</MenuItem>
      <MenuItem onClick={() => setOption('controlled ex2')}>Example 2</MenuItem>
      <MenuItem onClick={() => closeOnSelect('controlled ex3')}>
        Example 3
      </MenuItem>
    </Menu.Container>
  </Menu>
</div>;
```

## Search menu

A search menu is provided using the extended `Menu.SearchMenu` component. This component allows you to filter and group a list of options, and provides the render prop `renderItems` for customized rendering of the menu's grouped content.

_\*Note: This is meant ot be a controlled component. The `Menu.SearchMenu` component should be unmounted on close if the menu selections are to be kept in sync. The selection menu will keep its state if not unmounted from the DOM_

```jsx
import Heading from '../heading';
import Avatar from '../avatar';
import Detail from '../detail';
const [selected, setSelected] = React.useState([]);
const [open, setMenu] = React.useState(false);
const exampleStyle = { margin: 0, padding: '4px' };

const closeMenu = () => setMenu(false);
const openMenu = () => setMenu(true);

const options = [
  {
    group: 'Humans',
    name: 'sara',
    label: 'Sarah Connor',
    img:
      'https://avatars.dicebear.com/v2/avataaars/c81a7563b025b679a8bb8b24452fe954.svg',
  },
  {
    group: 'Robots',
    name: 'terminator',
    label: 'Terminator',
    img:
      'https://robohash.org/2f6e700371a87271586861458ebe77a8?set=set3&bgset=&size=400x400',
  },
  {
    group: 'Robots',
    name: 'johnny',
    label: 'Johnny 5',
    img:
      'https://robohash.org/c6999e565bac76df630772cf644da9bc?set=set3&bgset=&size=400x400',
  },
  {
    group: 'Humans',
    name: 'rocky',
    label: 'Rocky Balboa',
    img:
      'https://avatars.dicebear.com/v2/avataaars/4bfe3dd0ca4e5d33f296e93f9bd34dfb.svg',
  },
  {
    group: 'Robots',
    name: 'optimus',
    label: 'Optimus Prime',
    img:
      'https://robohash.org/264a7d4dc4ba5e64d9c078f5ed2a015d?set=set3&bgset=&size=400x400',
  },
  {
    group: 'Robots',
    name: 'hal',
    label: 'Hal',
    img:
      'https://gravatar.com/avatar/25d043733489d080d7595f059aec2cf6?s=400&d=robohash&r=x',
  },
  {
    group: 'Animals',
    name: 'nermal',
    label: 'Nermal',
    img:
      'https://robohash.org/d900a28e5b9ade0e263a30171b72a73e?set=set4&bgset=&size=400x400',
  },
];

<div>
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '8px',
    }}
  >
    {selected.map(({ img }) => (
      <Avatar size={{ width: '48px', height: '48px' }}>
        <img src={img} alt="placeholder" />
      </Avatar>
    ))}
  </div>
  <Menu>
    <Menu.Trigger
      onClick={openMenu}
      style={{ display: 'block', maxHeight: '36px' }}
    >
      Select characters
    </Menu.Trigger>
    {open && (
      <Menu.SearchMenu
        selected={selected}
        open
        onApply={setSelected}
        onClose={closeMenu}
        options={options}
        style={exampleStyle}
      />
    )}
  </Menu>
</div>;
```

### Columns

For a more compact view, columns can be set to true, for two columns, or a number for more than two columns. It's not recommended to display more than 3 columns in a menu.

```jsx
import Heading from '../heading';
import Avatar from '../avatar';
import Detail from '../detail';
const [selected, setSelected] = React.useState([]);
const [open, setMenu] = React.useState(false);
const exampleStyle = { margin: 0, padding: '4px' };

const closeMenu = () => setMenu(false);
const openMenu = () => setMenu(true);

const options = [
  {
    group: 'Humans',
    name: 'sara',
    label: 'Sarah Connor',
    img:
      'https://avatars.dicebear.com/v2/avataaars/c81a7563b025b679a8bb8b24452fe954.svg',
  },
  {
    group: 'Robots',
    name: 'terminator',
    label: 'Terminator',
    img:
      'https://robohash.org/2f6e700371a87271586861458ebe77a8?set=set3&bgset=&size=400x400',
  },
  {
    group: 'Robots',
    name: 'johnny',
    label: 'Johnny 5',
    img:
      'https://robohash.org/c6999e565bac76df630772cf644da9bc?set=set3&bgset=&size=400x400',
  },
  {
    group: 'Humans',
    name: 'rocky',
    label: 'Rocky Balboa',
    img:
      'https://avatars.dicebear.com/v2/avataaars/4bfe3dd0ca4e5d33f296e93f9bd34dfb.svg',
  },
  {
    group: 'Robots',
    name: 'optimus',
    label: 'Optimus Prime',
    img:
      'https://robohash.org/264a7d4dc4ba5e64d9c078f5ed2a015d?set=set3&bgset=&size=400x400',
  },
  {
    group: 'Robots',
    name: 'hal',
    label: 'Hal',
    img:
      'https://gravatar.com/avatar/25d043733489d080d7595f059aec2cf6?s=400&d=robohash&r=x',
  },
  {
    group: 'Animals',
    name: 'nermal',
    label: 'Nermal',
    img:
      'https://robohash.org/d900a28e5b9ade0e263a30171b72a73e?set=set4&bgset=&size=400x400',
  },
];

<div>
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '8px',
    }}
  >
    {selected.map(({ img }) => (
      <Avatar size={{ width: '48px', height: '48px' }}>
        <img src={img} alt="placeholder" />
      </Avatar>
    ))}
  </div>
  <Menu>
    <Menu.Trigger
      onClick={openMenu}
      style={{ display: 'block', maxHeight: '36px' }}
    >
      Compact characters
    </Menu.Trigger>
    {open && (
      <Menu.SearchMenu
        columns
        selected={selected}
        open
        onApply={setSelected}
        onClose={closeMenu}
        options={options}
        style={exampleStyle}
      />
    )}
  </Menu>
</div>;
```

#### Filter function

The default search function searches for a match against an Item's label and group. An alternative filtering method can be provided to the `filterBy` prop.

```jsx
import Heading from '../heading';
import Avatar from '../avatar';
import Detail from '../detail';
const [selected, setSelected] = React.useState([]);
const [open, setMenu] = React.useState(false);
const exampleStyle = { margin: 0, padding: '4px' };

const closeMenu = () => setMenu(false);
const openMenu = () => setMenu(true);

const options = [
  {
    group: 'Humans',
    name: 'sara',
    label: 'Sarah Connor',
    img:
      'https://avatars.dicebear.com/v2/avataaars/c81a7563b025b679a8bb8b24452fe954.svg',
    description: 'Hero',
  },
  {
    group: 'Robots',
    name: 'terminator',
    label: 'Terminator',
    img:
      'https://robohash.org/2f6e700371a87271586861458ebe77a8?set=set3&bgset=&size=400x400',
    description: 'Villain',
  },
  {
    group: 'Robots',
    name: 'johnny',
    label: 'Johnny 5',
    img:
      'https://robohash.org/c6999e565bac76df630772cf644da9bc?set=set3&bgset=&size=400x400',
    description: 'Hero',
  },
  {
    group: 'Humans',
    name: 'rocky',
    label: 'Rocky Balboa',
    img:
      'https://avatars.dicebear.com/v2/avataaars/4bfe3dd0ca4e5d33f296e93f9bd34dfb.svg',
    description: 'Hero',
  },
  {
    group: 'Robots',
    name: 'optimus',
    label: 'Optimus Prime',
    img:
      'https://robohash.org/264a7d4dc4ba5e64d9c078f5ed2a015d?set=set3&bgset=&size=400x400',
    description: 'Hero',
  },
  {
    group: 'Robots',
    name: 'hal',
    label: 'Hal',
    img:
      'https://gravatar.com/avatar/25d043733489d080d7595f059aec2cf6?s=400&d=robohash&r=x',
    description: 'Villain',
  },
  {
    group: 'Animals',
    name: 'nermal',
    label: 'Nermal',
    img:
      'https://robohash.org/d900a28e5b9ade0e263a30171b72a73e?set=set4&bgset=&size=400x400',
    description: 'Neutral',
  },
];

const description = (opts = [], search = '') => {
  const str = search.toLowerCase();

  return !search.length
    ? opts
    : opts.filter(opt => opt.description.toLowerCase().includes(str));
};

<div>
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '8px',
    }}
  >
    {selected.map(({ img }) => (
      <Avatar size={{ width: '48px', height: '48px' }}>
        <img src={img} alt="placeholder" />
      </Avatar>
    ))}
  </div>
  <Menu>
    <Menu.Trigger
      onClick={openMenu}
      style={{ display: 'block', maxHeight: '36px' }}
    >
      Character description
    </Menu.Trigger>
    {open && (
      <Menu.SearchMenu
        searchPlaceholder="Search by description"
        filterBy={description}
        selected={selected}
        open
        onApply={setSelected}
        onClose={closeMenu}
        options={options}
        style={exampleStyle}
      />
    )}
  </Menu>
</div>;
```

## Sub Components

### `Menu.Container`

The `Menu.Container` is a wrapper around the menu content that provides the correct refs and event listeners to display a popup menu.

### `Menu.Trigger`

The `Menu.Trigger` provides the correct refs and event listeners to trigger/open a menu. This element is a polymorphic component, meaning the root element can be changed by passing an element to the `as` prop. By default the root element is a [`Button`](#/React%20Components/Button). Whatever is passed to the `as` prop should accept an `inputRef` or a `ref` prop.

## Related

- [Tooltip](#/React%20Components/TooltipHoverArea)
- [Tag.Filter](#/React%20Components/Tag)
- [Button](#/React%20Components/Button)
