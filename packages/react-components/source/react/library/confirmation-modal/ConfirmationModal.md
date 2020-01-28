## Overview

A `Confirmation Modal` is a specialized [Modal](#modal) with two action buttons shown when a user performs an action that would destroy a meaningful amount of their work. They are prompted to confirm this action to make sure that it wasn't accidentally or unintentionally done.

### Microcopy

- It is recommended to differentiate the button type for the confirm and cancel button, e.g. making the confirm button be of type `primary` or `danger` and cancel button be of type `secondary`.

## Basic Use

A `Confirmation Modal` is a controlled component, so you're required to have a handler for controlling the open state of the modal.

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

## Related

- [Modal](#/React%20Components/Modal)
- [Button](#/React%20Components/Button)
