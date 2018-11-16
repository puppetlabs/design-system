```
<List>
  <List.Item>I'm a happy list item!</List.Item>
</List>
```

Selected, selectable, editable, and deletable `ListItem`:

```
<List>
  <List.Item
    selected
    onRemove={ () => { console.log('I was removed!'); } }
    onEdit={ () => { console.log('I was edited!'); } }
    onClick={ () => { console.log('I was clicked!'); } }
  >
    I'm already selected
  </List.Item>
  <List.Item
    onRemove={ () => { console.log('I was removed!'); } }
    onEdit={ () => { console.log('I was edited!'); } }
    onClick={ () => { console.log('I was clicked!'); } }
  >
    I'm not selected by default
  </List.Item>
  <List.Item
    onRemove={ () => { console.log('I was removed!'); } }
    onEdit={ () => { console.log('I was edited!'); } }
    onClick={ () => { console.log('I was clicked!'); } }
  >
    Nor am I
  </List.Item>
  <List.Item
    onRemove={ () => { console.log('I was removed!'); } }
    onEdit={ () => { console.log('I was edited!'); } }
    onClick={ () => { console.log('I was clicked!'); } }
  >
    Me neither
  </List.Item>
</List>
```

Medium sized selectable ListItem:

```
<List>
  <List.Item
    selected
    size="medium"
    onRemove={ () => { console.log('I was removed!'); } }
    onEdit={ () => { console.log('I was edited!'); } }
    onClick={ () => { console.log('I was clicked!'); } }
  >
    I'm already selected
  </List.Item>
  <List.Item
    size="medium"
    onRemove={ () => { console.log('I was removed!'); } }
    onEdit={ () => { console.log('I was edited!'); } }
    onClick={ () => { console.log('I was clicked!'); } }
  >
    I'm not selected by default
  </List.Item>
  <List.Item
    size="medium"
    onRemove={ () => { console.log('I was removed!'); } }
    onEdit={ () => { console.log('I was edited!'); } }
    onClick={ () => { console.log('I was clicked!'); } }
  >
    Nor am I
  </List.Item>
  <List.Item
    size="medium"
    onRemove={ () => { console.log('I was removed!'); } }
    onEdit={ () => { console.log('I was edited!'); } }
    onClick={ () => { console.log('I was clicked!'); } }
  >
    Me neither
  </List.Item>
</List>
```

Fancy `ListItem`:

```
<List>
  <List.Item key="fancy" fancy onEdit={ () => {} } onRemove={ () => {} }>
    You fancy huh
  </List.Item>
  <List.Item key="so-fancy" fancy onRemove={ () => {} }>
    So fancy
  </List.Item>
</List>
```
