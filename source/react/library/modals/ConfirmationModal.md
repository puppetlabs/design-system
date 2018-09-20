```
initialState = { isOpen: false };
<div>
  <Button
    onClick={ () => { setState({ isOpen: true }) }}
    label="Open confirmation modal"
  />

  { state.isOpen &&
  <ConfirmationModal
    title="Delete Report?"
    confirmationMessage="Are you really, really sure?"
    onCancel={ () => { setState({ isOpen: false }) }}
    onConfirm={ () => { setState({ isOpen: false }) }}
  />}
</div>
```

Action buttons left aligned

```
initialState = { isOpen: false };
<div>
  <Button
    onClick={ () => { setState({ isOpen: true }) }}
    label="Open confirmation modal"
  />

  { state.isOpen &&
  <ConfirmationModal
    actionsPosition="left"
    title="Delete Report?"
    confirmationMessage="Are you really, really sure?"
    onCancel={ () => { setState({ isOpen: false }) }}
    onConfirm={ () => { setState({ isOpen: false }) }}
  />}
</div>
```
