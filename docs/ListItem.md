```
<List>
  <ListItem size="small">I'm a happy list item!</ListItem>
</List>
```

Selected, selectable, editable, and deletable `ListItem`:
```
<List>
  <ListItem
    selected
    size="small"
    onRemove={ () => { console.log('I was removed!'); } }
    onEdit={ () => { console.log('I was edited!'); } }
    onClick={ () => { console.log('I was clicked!'); } }
  >
    I'm a happy list item!
  </ListItem>
</List>
```
