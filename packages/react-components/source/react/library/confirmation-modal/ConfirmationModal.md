A `Confirmation Modal` is a modal shown when a user does something that would destroy a meaningful amount of their work. They are prompted to confirm this action to make sure that it wasn't accidentally or unintentionally done.

```jsx
import Button from '../button';

initialState = {
  open: false,
};

<>
  <Button type="danger" onClick={() => setState({ open: true })}>
    Open confirmation modal
  </Button>

  {state.open && (
    <ConfirmationModal
      title="Are you sure?"
      description="This isn't going to be pretty. Is this really what you want to do?"
      confirmLabel="Destroy forever?"
      cancelLabel="Go back, go back!!"
      confirmButtonType="danger"
      onConfirm={() => setState({ open: false })}
      onCancel={() => setState({ open: false })}
    />
  )}
</>;
```
