## Alert as a growl

```
const initialState = { isGrowlActive: false };
<div>
  <Button onClick={ () => { setState({ isGrowlActive: !state.isGrowlActive }) } } >Toggle growl</Button>
  <Alert
    isActive={ state.isGrowlActive }
    message="Hello world"
    onClose={ () => { setState({ isGrowlActive: false }) } }
  />
</div>
```

## Alert types

```
  <Alert growl={ false } isActive={ true } message="Success! Things seem to have gone well afterall." />
```

Error

```
<Alert growl={ false } isActive={ true } type="error" message="Error! Things have gone bad. I blame Sig." />
```

Warning

```
<Alert growl={ false } isActive={ true } type="warning" message="This may affect access for other users" />
```

Info

```
<Alert growl={ false } isActive={ true } type="info" message="Hello world" />
```
