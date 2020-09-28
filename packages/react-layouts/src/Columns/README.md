## Overview

`Columns` is a simple layout component that uses flexbox to evenly layout child
`Columns.Column` components.

## Basic use

```jsx
import { Text } from '@puppet/react-components';

<Columns>
  <Columns.Column>
    <Text>This is the first column.</Text>
  </Columns.Column>
  <Columns.Column>
    <Text>This is the second column.</Text>
  </Columns.Column>
  <Columns.Column>
    <Text>This is the third column.</Text>
  </Columns.Column>
</Columns>;
```

## Fixed width columns

```jsx
import { Text } from '@puppet/react-components';

<Columns>
  <Columns.Column style={{ backgroundColor: 'WhiteSmoke' }}>
    <Text>This is an expanding column.</Text>
  </Columns.Column>
  <Columns.Column fixed style={{ backgroundColor: 'LightGrey' }}>
    <Text style={{ width: 200 }}>This is a fixed column.</Text>
  </Columns.Column>
</Columns>;
```

## Related

- [SidePanel](#/React%20Components/SidePanel)
- [Toolbar](#/React%20Components/Toolbar)
