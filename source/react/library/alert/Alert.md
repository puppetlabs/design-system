## Alert as a growl

```
const initialState = { isGrowlActive: false };
<div>
  <Button onClick={ () => { setState({ isGrowlActive: !state.isGrowlActive }) } } >Toggle growl</Button>
  <Alert
    growl={ true }
    isActive={ state.isGrowlActive }
    onClose={ () => { setState({ isGrowlActive: false }) } }
  >
    Success! You toggled it!
  </Alert>
</div>
```

## Alert types

Success
```
  <Alert isActive={ true } type="success">
    Success! Things seem to have gone well afterall.
  </Alert>
```

Danger

```
<Alert isActive={ true } type="danger">
  Danger! Things have gone bad. I blame Sig.
</Alert>
```

Warning

```
<Alert isActive={ true } type="warning">
  This may affect access for other users.
</Alert>
```

Info

```
<Alert isActive={ true } type="info">
  This is some good content. Now you know.
</Alert>
```

Neutral
```
<Alert isActive={ true } type="neutral">
  Welp. This is meh content.
</Alert>
```
