Menus are great for rendering within popovers.
```
const target = <Button>Open menu with list</Button>;
const listOptions = [
  { id: 0, value: 'option1' },
  { id: 1, value: 'option2' },
];
<Popover target={ target } padding={ false } >
  <Menu>
    <MenuHeader title="I'm a happy menu title!" />
    <MenuList options={ listOptions } />
  </Menu>
</Popover>
```

`MenuSection`s can be rendered within your menu:
```
const target = <Button>Open menu with sections</Button>;
<Popover target={ target } padding={ false} >
  <Menu>
    <MenuHeader title="I'm a happy menu title!" />
    <MenuSection>
      I'm a happy section!
    </MenuSection>
    <MenuSection>
      Me too!
    </MenuSection>
  </Menu>
</Popover>
```
