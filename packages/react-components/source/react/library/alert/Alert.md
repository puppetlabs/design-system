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

## Content Formatting

The `Alert` has several sub-components to aid in the formatting of inner content.

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

### Error formatting

The `Alert.Error` component provides automatic rendering of error messages, including an optional list of nested causes. It will accept a string error message, a native `Error` instance, or any type satisfying an extended interface which includes an optional array of error causes, which themselves can be strings, Error instances, or extended error types:

```js static
{
  message: 'Top-level error message',
  causes: [
    {
      message: 'Error cause 1',
      causes: ['Elaborating on cause 1'],
      sensitivity: 0 // sensitivities higher than 0 will not display, see below
    },
    new Error('I can also use an error instance here'),
    'I can also use a string here'
  ]
}
```

A custom error type extending the native Error with the addition of a `cause` array will satisfy this interface:

```js static
class CustomError extends Error {
  constructor(message, causes) {
    super(message);
    this.causes = causes;
  }
}
```

#### Basic use:

Errors of any valid type will be displayed automatically:

```jsx
const extendedError = {
  message: "There's no reason to become alarmed",
  causes: [
    {
      message: "and we hope you'll enjoy the rest of your flight.",
      causes: [
        {
          message:
            'By the way, is there anyone on board who knows how to fly a plane?',
        },
      ],
    },
  ],
};

<div>
  <Alert type="danger" style={{ marginBottom: 5 }}>
    <Alert.Error error={extendedError} />
  </Alert>
  <Alert type="warning" style={{ marginBottom: 5 }}>
    <Alert.Error error="The autopilot is deflating!" />
  </Alert>
  <Alert type="info" style={{ marginBottom: 5 }}>
    <Alert.Error
      error={
        new Error('Looks like I picked the wrong week to quit sniffing glue.')
      }
    />
  </Alert>
</div>;
```

#### Cause sensitivity:

A primary usecase for this meta-component is to automatically display API-generated errors. In this scenario it is likely that some errors returned as causes will be overly technical, and therefor not fit for display to end-users. To solve for this case, the Error alert will hide `causes` with a numerical `sensitivity` index that is greater than zero:

```jsx
const extendedError = {
  message: 'Yo, your stuff is whack!',
  causes: [
    {
      message:
        'This is the reason for whackness we will display to the user, but there is more!',
    },
    {
      message:
        'Jargony jargon jargon this is the technical reason why it is whack',
      sensitivity: 50,
    },
  ],
};

<Alert type="danger">
  <Alert.Error error={extendedError} />
</Alert>;
```
