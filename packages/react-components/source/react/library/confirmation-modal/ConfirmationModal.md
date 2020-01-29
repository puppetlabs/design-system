## Overview

A `ConfirmationModal` is a specialized [Modal](#/React%20Components/Modal) with two action buttons, e.g. shown when a user performs an action that would destroy a meaningful amount of their work.

It is recommended to differentiate the button type for the confirm and cancel button, e.g. making the confirm button be of `type` "primary" or "danger" and cancel button be of `type` "tertiary".

## Basic Use

A `ConfirmationModal` is a controlled component, so you are required to have a handler for controlling the open state of the modal.

```jsx
import Button from '../button';

const [open, setOpen] = React.useState(false);

<>
  <Button type="danger" onClick={() => setOpen(true)}>
    Open confirmation modal
  </Button>
  <ConfirmationModal
    title="Are you sure?"
    description="This isn't going to be pretty. Is this really what you want to do?"
    confirmLabel="Destroy forever?"
    cancelLabel="Go back, go back!!"
    confirmButtonType="danger"
    onConfirm={() => setOpen(false)}
    onCancel={() => setOpen(false)}
    isOpen={open}
  />
</>;
```

## Related

- [Modal](#/React%20Components/Modal)
- [Button](#/React%20Components/Button)
