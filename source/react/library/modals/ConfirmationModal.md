```
initialState = { isOpen: false };
<div>
  <Button
    onClick={ () => { setState({ isOpen: true }) }}
    label="Open confirmation modal"
  />

  { state.isOpen &&
  <ConfirmationModal
    confirmationMessage="Are you really, really sure?"
    onCancel={ () => { setState({ isOpen: false }) }}
    onConfirm={ () => { setState({ isOpen: false }) }}
  />}
</div>
```
