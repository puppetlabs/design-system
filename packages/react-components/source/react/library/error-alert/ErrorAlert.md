## Overview

The `ErrorAlert` component is a wrapper around the basic [Alert](#/React%20Components/Alert) that provides automatic rendering of error messages, including an optional list of nested causes. It will accept a string error message, a native `Error` instance, or any type satisfying an extended interface which includes an optional array of error causes, which themselves can be strings, Error instances, or extended error types:

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

### Basic use:

Errors of any valid type will be displayed automatically:

```jsx

const extendedError = {
  message: 'There\'s no reason to become alarmed',
  causes: [
    {
      message: 'and we hope you\'ll enjoy the rest of your flight.',
      causes: [
        {
          message: 'By the way, is there anyone on board who knows how to fly a plane?'
        }
      ]
    },
  ]
};

<div>
  <ErrorAlert error={extendedError} style={{ marginBottom: 5 }} />
  <ErrorAlert error="The autopilot is deflating!" style={{ marginBottom: 5 }} />
  <ErrorAlert error={new Error('Looks like I picked the wrong week to quit sniffing glue.')} style={{ marginBottom: 5 }} />
</div>
```

### Cause sensitivity:

A primary usecase for this meta-component is to automatically display API-generated errors. In this scenario it is likely that some errors returned as causes will be overly technical, and therefor not fit for display to end-users. To solve for this case, the Error alert will hide `causes` with a numerical `sensitivity` index that is greater than zero:

```jsx

const extendedError = {
  message: 'Yo, your stuff is whack!',
  causes: [
    {
      message: 'This is the reason for whackness we will display to the user, but there is more!',
    },
    {
      message: 'Jargony jargon jargon this is the technical reason why it is whack',
      sensitivity: 50,
    }
  ]
};

<ErrorAlert error={extendedError} />
```
