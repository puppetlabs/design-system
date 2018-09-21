## Alert as a growl

```
const initialState = { isGrowlActive: false };
<div>
  <Button label="Toggle growl" onClick={ () => { setState({ isGrowlActive: !state.isGrowlActive }) } } />
  <Alert
    isActive={ state.isGrowlActive }
    message="Hello world"
    onClose={ () => { setState({ isGrowlActive: false }) } }
  />
</div>
```

## Alert types

```
  <Alert growl={ false } isActive={ true } message="Hello world" />
```

Error

```
<Alert growl={ false } isActive={ true } type="error" message="Hello world" />
```

Warning

```
<Alert growl={ false } isActive={ true } type="warning" message="Hello world" />
```

Info

```
<Alert growl={ false } isActive={ true } type="info" message="Hello world" />
```
