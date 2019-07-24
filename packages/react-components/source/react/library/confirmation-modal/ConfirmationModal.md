A `Confirmation Modal` is a modal shown when a user does something that would destroy a meaningful amount of their work. They are prompted to confirm this action to make sure that it wasn't accidentally or unintentionally done.

```jsx
import Button from '../button';

const [open, setOpen] = React.useState(false);

<>
  <Button type="danger" onClick={() => setOpen(true)}>
    Open confirmation modal
  </Button>

  {open && (
    <ConfirmationModal
      title="Are you sure?"
      description="This isn't going to be pretty. Is this really what you want to do?"
      confirmLabel="Destroy forever?"
      cancelLabel="Go back, go back!!"
      confirmButtonType="danger"
      onConfirm={() => setOpen(false)}
      onCancel={() => setOpen(false)}
    />
  )}
</>;
```
