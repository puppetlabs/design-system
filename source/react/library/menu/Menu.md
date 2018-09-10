#### Deprecated
##### Note that size has been deprecated from menus and is no longer a valid prop.

#### Basic Menu

`MenuList` are rendered within popovers.

```
const target = <Button>Open menu</Button>;
const titansListOptions = [
  { id: 0, value: 'Option 0' },
  { id: 1, value: 'Option 1' },
  { id: 2, value: 'Option 2' },
];

<Popover target={ target } padding={ false } border={ false } inheritTargetWidth>
  <Menu>
    <MenuList options={ titansListOptions } />
  </Menu>
</Popover>
```

#### Menu with title and icons.

`listOptions` can display icons next to each item. Titles may optionally have a `closeButton`.

```
const target = <Button icon="kebab" square secondary></Button>;
const listOptions = [
  { id: 0, value: 'Edit', icon: "pencil" },
  { id: 1, value: 'Share', icon: "share" },
  { id: 2, value: 'Duplicate', icon: "clone" },
  { id: 3, value: 'Delete', icon: "trash" },
];
<Popover menu title="Options" target={ target } padding={ false } border={ false } closeButton>
  <MenuList options={ listOptions } />
</Popover>
```

#### Sections
`MenuSection` can be used to separate content from one another. Useful when you need to distinguish categories to provide further context to users.

```
const target = <Button>Open menu with sections</Button>;
const titansListOptions = [
  { id: 0, value: 'Beast Boy' },
  { id: 1, value: 'Cyborg' },
  { id: 2, value: 'Raven' },
  { id: 3, value: 'Robin' },
  { id: 4, value: 'Starfire' },
];
const hiveListOptions = [
  { id: 5, value: 'Gizmo' },
  { id: 6, value: 'Jinx' },
  { id: 7, value: 'Mammoth' },
  { id: 8, value: 'Billy Numerous' },
  { id: 9, value: 'See-More' },
];

<Popover target={ target } padding={ false } border={ false } inheritTargetWidth>
  <Menu>
    <MenuHeader title="I'm a happy menu title!" />
    <MenuSection title="Teen Titans">
      <MenuList options={ titansListOptions } />
    </MenuSection>
    <MenuSection title="Hive Five">
      <MenuList options={ hiveListOptions } />
    </MenuSection>
  </Menu>
</Popover>
```

#### Actions and Action Messages
`MenuActions` can be used to provide context-specific actions and informations to users.

```
const listOptions = [
  { id: 0, value: 'Show all Warcasters'},
  { id: 1, value: 'Show all Units'},
  { id: 2, value: 'Show all Solos'},
  { id: 3, value: 'Show all Warjacks'},
];
const target = <Button>Menu with actions</Button>;

<Popover target={ target } padding={ false } border={ false } inheritTargetWidth>
  <Menu>
    <MenuSection title="Models">
      <MenuList options={ listOptions } />
    </MenuSection>
    <MenuActions>
      <MenuActions.Buttons>
        <ButtonGroup>
          <Button simple secondary>Cancel</Button>
          <Button simple>Apply</Button>
        </ButtonGroup>
      </MenuActions.Buttons>
    </MenuActions>
  </Menu>
</Popover>
```

```
const target = <Button>Menu with action messages</Button>;
const listCols = [
  { id: 0, value: 'Display Date'},
  { id: 1, value: 'Display Name'},
  { id: 2, value: 'Display Serial'},
];
const listRows = [
  { id: 0, value: 'State'},
  { id: 1, value: 'Country'},
  { id: 2, value: 'Planet'},
];

<Popover target={ target } padding={ false } border={ false } inheritTargetWidth>
  <Menu>
    <MenuSection title="Columns">
      <MenuList options={ listCols } />
    </MenuSection>
    <MenuSection title="Rows">
      <MenuList options={ listRows } />
    </MenuSection>
    <MenuActions>
      <MenuActions.Message>
        You must select at least one row and one column.
      </MenuActions.Message>
    </MenuActions>
  </Menu>
</Popover>
```

#### Dark Menu

A dark `Menu` in a dark `Popover`:

```
const target = <Button>This is a dark menu</Button>;

const listOptions = [
  { id: 0, value: 'Abaddon Black'},
  { id: 1, value: 'Accursed Black'},
  { id: 2, value: 'Chaos Black'},
  { id: 3, value: 'Matte Black'},
  { id: 4, value: 'Pure Black'},
  { id: 5, value: 'Thamar Black'},
];
<Popover dark menu title="Dark Menu" target={ target } border={ false } inheritTargetWidth closeButton>
  <MenuSection title="Black Paints">
    <MenuList options={ listOptions } />
  </MenuSection>
</Popover>
```
