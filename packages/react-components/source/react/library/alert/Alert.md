## Overview

The Alert component displays information that explains nearby content or alerts the user to an warning or error.

## Types

There are four types of alerts. "info" and "warning" are often persistent messages to the user whereas "success" and "danger" often show up in response to a user action.

### Success

```jsx
<Alert type="success">Success! Things seem to have gone well afterall.</Alert>
```

### Danger

```jsx
<Alert type="danger">Danger! Things have gone bad. I blame Sig.</Alert>
```

### Warning

```jsx
<Alert type="warning">This may affect access for other users.</Alert>
```

### Info

```jsx
<Alert type="info">This is some good content. Now you know.</Alert>
```

## Variations

### Closeable

Add an "x" button with the `closeable` and `onClose` props.

```jsx
<Alert
  type="info"
  closeable
  onClose={() => console.log('theoretically at least')}
>
  Did you know this alert can be dismissed?
</Alert>
```

### Elevation

The `elevated` prop adds a drop shadow to the Alert.

```jsx
<Alert elevated type="danger">
  This alert is elevated. Are you ready for that?
</Alert>
```

### Extra information

Add a lighter text section below the main alert with the `Alert.Message` component.

```jsx
<Alert
  type="warning"
  closeable
  onClose={() => console.log('theoretically at least')}
>
  Warning! Something did not complete.
  <Alert.Message>
    This will give the user more information on what the alert is about.
  </Alert.Message>
</Alert>
```

### Actions

An Alert can also contain buttons.

```jsx
import Button from '../button';

<Alert
  type="warning"
  closeable
  onClose={() => console.log('theoretically at least')}
>
  Warning! Something did not complete.
  <Alert.Message>
    This will give the user more information on what the alert is about.
  </Alert.Message>
  <Alert.Actions>
    <Button type="primary" onClick={() => console.log('clicked')}>
      Button
    </Button>
    <Button type="transparent" onClick={() => console.log('clicked')}>
      Cancel
    </Button>
  </Alert.Actions>
</Alert>;
```
