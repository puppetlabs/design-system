## Overview

The loading component provides a general purpose spinner. It will automatically center itself within its containing element. This component also includes a loader of configurable size.

Use the loading indicator when:

- A process is taking long enough that you want the user to know that they system isn’t hung.
- The load time is greater than 1 second. (Do not use the loading indicator when the load time is 1 second or shorter).

See also: [Icon](#/React%20Components/Icon) and [Form](#/React%20Components/Form)

## Basic Use

There are 4 available sizes for this component, with the large size as the default. The small, tiny or custom sizes can also be used when appropriate.

```jsx
import Text from '../text';

<table className="rc-loading-table">
  <thead>
    <tr>
      <th>
        <Text>Large (default)</Text>
      </th>
      <th>
        <Text>Small</Text>
      </th>
      <th>
        <Text>Tiny</Text>
      </th>
      <th>
        <Text>Custom</Text>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <Loading size="large" />
      </td>
      <td>
        <Loading size="small" />
      </td>
      <td>
        <Loading size="tiny" />
      </td>
      <td>
        <Loading style={{ height: 16, width: 16 }} />
      </td>
    </tr>
  </tbody>
</table>;
```

## Related

- [Form](#/React%20Components/Form)
- [Icon](#/React%20Components/Icon)
