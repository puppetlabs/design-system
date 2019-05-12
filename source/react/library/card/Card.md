Cards provide flexible containers for related pieces of UI content. There are primary and secondary variants available at multiple elevations. Each may become 'selectable' for use in a selectable list.

Design specification: <a href="http://designsystem.puppetlabs.net/containers" target="_top">designsystem.puppetlabs.net/containers</a>

### Primary Cards

```
const cardExampleStyle = { width: 150, height: 150, alignItems: 'center', justifyContent: 'center', marginRight: 12 };
<div style={{ display: 'flex' }}>
  <Card style={cardExampleStyle}>
    <Heading as="h3">Flat</Heading>
    <Text>Elevation 0</Text>
  </Card>
  <Card elevation={50} style={cardExampleStyle}>
    <Heading as="h3">Subtle</Heading>
    <Text>Elevation 50</Text>
  </Card>
  <Card elevation={100} style={cardExampleStyle}>
    <Heading as="h3">Raised</Heading>
    <Text>Elevation 100</Text>
  </Card>
  <Card selectable style={cardExampleStyle}>
    <Heading as="h3">Selectable</Heading>
    <Text>Elevation 50</Text>
  </Card>
  <Card selectable selected style={cardExampleStyle}>
    <Heading as="h3">Selected</Heading>
    <Text>Elevation 50</Text>
  </Card>
</div>
```

### Secondary Cards

```
const cardExampleStyle = { width: 150, height: 150, alignItems: 'center', justifyContent: 'center', marginRight: 12 };
<div style={{ display: 'flex' }}>
  <Card type="secondary" style={cardExampleStyle}>
    <Heading as="h3">Flat</Heading>
    <Text>Elevation 0</Text>
  </Card>
  <Card type="secondary" elevation={50} style={cardExampleStyle}>
    <Heading as="h3">Subtle</Heading>
    <Text>Elevation 50</Text>
  </Card>
  <Card type="secondary" elevation={100} style={cardExampleStyle}>
    <Heading as="h3">Raised</Heading>
    <Text>Elevation 100</Text>
  </Card>
  <Card type="secondary" selectable style={cardExampleStyle}>
    <Heading as="h3">Selectable</Heading>
    <Text>Elevation 50</Text>
  </Card>
  <Card type="secondary" selectable selected style={cardExampleStyle}>
    <Heading as="h3">Selected</Heading>
    <Text>Elevation 50</Text>
  </Card>
</div>
```

### Card Content

The Card component includes sub-components for arranging content in repeatable manner. **NOTE**: These features are not design complete and are subject to change in future releases.

```
const cardActions = [
  { label: 'Do thing 1', id: 0, onClick: () => console.log('You did thing 1') },
  { label: 'Do thing 2!', id: 1, onClick: () => console.log('You did thing 2') },
  { label: 'Me three...', id: 2, onClick: () => console.log('You did thing 3') },
];

const actions = [
  <Card.ActionsMenu id="menu-1" actions={ cardActions } />,
];

<Card>
  <Card.Header title="Title" subtitle="Card Subtitle" actions={ actions } />
  <Card.Section>
    Card Section
  </Card.Section>
  <Card.Section>
    Another Card Section
  </Card.Section>
</Card>
```
