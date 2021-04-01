## Overview

Overlays allow you to place any content on top of the existing view. The overlay placed in relation to a target element, and is positioned based on the `align` and `position` properties.

## Visibility and positioning

```jsx
import Button from '../button';

const parentStyle = {
  padding: '20px',
  border: '1px solid black',
  maxWidth: '500px',
  marginTop: '20px',
};
const targetStyle = {
  padding: '15px',
  border: '1px solid black',
};
const overlayStyle = {
  backgroundColor: '#222629',
  color: 'white',
  padding: '10px',
};

const selectNext = (arr, selectFn, current) => () => {
  selectFn((current + 1) % arr.length);
};

const positions = ['top', 'right', 'bottom', 'left'];
const alignments = ['outer', 'center', 'inner'];

const [position, setPosition] = React.useState(0);
const [align, setAlign] = React.useState(0);
const [visible, setVisible] = React.useState(false);

const targetRef = React.useRef(null);

<div>
  <Button onClick={selectNext(positions, setPosition, position)}>
    Toggle position
  </Button>
  <Button onClick={selectNext(alignments, setAlign, align)}>
    Toggle alignment
  </Button>
  <Button onClick={() => setVisible(!visible)}>
    {visible ? 'Hide' : 'Show'}
  </Button>

  <div style={parentStyle}>
    <p>Position: {positions[position]}</p>
    <p>Align: {alignments[align]}</p>
    <p ref={targetRef} style={targetStyle}>
      Target container
    </p>
  </div>

  <Overlay
    target={targetRef}
    position={positions[position]}
    align={alignments[align]}
    show={visible}
  >
    <div style={overlayStyle}>Overlay</div>
  </Overlay>
</div>;
```

## Uses

### Confirm delete

```jsx
import Button from '../button';
import Table from '../table';

const [isVisible, setIsVisible] = React.useState(false);
const targetRef = React.useRef(null);

const renderActions = () => (
  <Button
    ref={targetRef}
    type="transparent"
    icon="trash"
    disabled={isVisible}
    onClick={() => setIsVisible(true)}
  />
);
const columns = [
  { label: 'Name', dataKey: 'name' },
  { label: 'Description', dataKey: 'description' },
  {
    label: 'Actions',
    dataKey: 'actions',
    cellRenderer: renderActions,
    style: { textAlign: 'center' },
  },
];

const rows = [
  { id: 1, name: 'Name 1', description: 'First name', actions: '' },
];

<div>
  <Table data={rows} columns={columns} />

  <Overlay target={targetRef} show={isVisible} position="right" align="inner">
    <div>
      <Button type="danger" onClick={() => setIsVisible(false)}>
        Delete
      </Button>
      <Button type="tertiary" onClick={() => setIsVisible(false)}>
        Cancel
      </Button>
    </div>
  </Overlay>
</div>;
```
