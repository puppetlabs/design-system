```
<List>
  <ListItem>I'm a happy list item!</ListItem>
</List>
```

Selected, selectable, editable, and deletable `ListItem`:

```
<List>
  <ListItem
    selected
    onRemove={ () => { console.log('I was removed!'); } }
    onEdit={ () => { console.log('I was edited!'); } }
    onClick={ () => { console.log('I was clicked!'); } }
  >
    I'm a happy list item!
  </ListItem>
</List>
```

Fancy `ListItem`:

```
<List>
  <ListItem key="fancy" fancy onEdit={ () => {} } onRemove={ () => {} }>
    You fancy huh
  </ListItem>
  <ListItem key="so-fancy" fancy onRemove={ () => {} }>
    So fancy
  </ListItem>
</List>
```
