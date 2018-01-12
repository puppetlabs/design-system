Menus are great for rendering within popovers.
```
const target = <Button>Open menu with list</Button>;
const listOptions = [
  { id: 0, value: 'option1' },
  { id: 1, value: 'option2' },
];
<Popover menu hint="Happy menu title" target={ target } padding={ false } border={ false }>
  <Menu>
    <MenuList options={ listOptions } />
  </Menu>
</Popover>
```

`MenuSection`s can be rendered within your menu:
```
const target = <Button>Open menu with sections</Button>;
<Popover target={ target } padding={ false } border={ false }>
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

`MenuActions`s can be used to provide context-specific actions and informations to users.
```
const target = <Button>Open menu that with action messages</Button>;
<Popover target={ target } padding={ false } border={ false }>
  <Menu>
    <MenuHeader title="I'm a happy menu title!" />
    <MenuSection>
      I'm a happy section!
    </MenuSection>
    <MenuActions>
      <MenuActions.Message>
        Stop--hammer time!
      </MenuActions.Message>
    </MenuActions>
  </Menu>
</Popover>
```

```
const target = <Button>Open menu that with actions</Button>;
<Popover target={ target } padding={ false } border={ false }>
  <Menu>
    <MenuHeader title="I'm a happy menu title!" />
    <MenuSection>
      I'm a happy section!
    </MenuSection>
    <MenuActions>
      <MenuActions.Buttons>
        <Button secondary>Action 1</Button>
        <Button>Action 2</Button>
      </MenuActions.Buttons>
    </MenuActions>
  </Menu>
</Popover>
```