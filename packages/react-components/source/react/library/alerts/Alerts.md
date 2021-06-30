## Overview

The Alerts component is a container that displays a collection of floating ("growl") Alert components fixed to the upper-right of the screen.

### Basic use

Simply pass a collection of Alert components to be wrapped by Alerts.

```jsx
import Alert from '../alert';
import Button from '../button';

const [showAlerts, setShowAlerts] = React.useState(false);

<>
  <Button
    onClick={() => {
      setShowAlerts(true);
      setTimeout(() => setShowAlerts(false), 5000);
    }}
  >
    Show alert and hide after 5 seconds
  </Button>
  {showAlerts && (
    <Alerts>
      <Alert type="danger">Heads up! Something went wrong.</Alert>
    </Alerts>
  )}
</>;
```

### Closeable alerts

See Alert documentation for options available in that component like `closeable` since Alerts is a simple wrapper for positioning.

```jsx
import Alert from '../alert';
import Button from '../button';

const [alerts, setAlerts] = React.useState([]);
const initialAlerts = [
  { id: 'first', message: 'Heads up! Something went wrong.' },
  { id: 'second', message: 'And another thing seems to have gone wrong.' },
];

<>
  <Button onClick={() => setAlerts(initialAlerts)}>
    Show closeable alerts
  </Button>
  {alerts.length > 0 && (
    <Alerts>
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          type="danger"
          closeable
          onClose={() => setAlerts(alerts.filter(a => a.id !== alert.id))}
        >
          {alert.message}
        </Alert>
      ))}
    </Alerts>
  )}
</>;
```
