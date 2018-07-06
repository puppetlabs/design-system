Menus are great for rendering within popovers.
```
const target = <Button>Open menu with list</Button>;
const listOptions = [
  { id: 0, value: 'option1' },
  { id: 1, value: 'option2' },
];
<Popover menu hint="Happy menu title" target={ target } padding={ false } border={ false } width="200px">
  <MenuList options={ listOptions } />
</Popover>
```

A dark `Menu` in a dark `Popover`:
```
const target = <Button>Open dark menu</Button>;
const listOptions = [
  { id: 0, value: 'option1' },
  { id: 1, value: 'option2' },
];
<Popover dark menu hint="Happy menu title" target={ target } padding={ false } border={ false } width="200px">
  <MenuList dark options={ listOptions } />
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
        <ButtonGroup>
          <Button simple secondary>Cancel</Button>
          <Button simple>Save</Button>
        </ButtonGroup>
      </MenuActions.Buttons>
    </MenuActions>
  </Menu>
</Popover>
```
