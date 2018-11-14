Cards provide flexible containers for related pieces of UI content. There are primary and secondary variants available at multiple elevations. Each may become 'selectable' for use in a selectable list.

Design specification: [http://styleguide.puppetlabs.net/Containers.html](http://styleguide.puppetlabs.net/Containers.html)

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
  <Card elevation={50} selectable style={cardExampleStyle}>
    <Heading as="h3">Selectable</Heading>
    <Text>Elevation 0 - 100</Text>
  </Card>
  <Card elevation={50} selectable selected style={cardExampleStyle}>
    <Heading as="h3">Selected</Heading>
    <Text>Elevation 0 - 100</Text>
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
  <Card type="secondary" elevation={50} selectable style={cardExampleStyle}>
    <Heading as="h3">Selectable</Heading>
    <Text>Elevation 0 - 100</Text>
  </Card>
  <Card type="secondary" elevation={50} selectable selected style={cardExampleStyle}>
    <Heading as="h3">Selected</Heading>
    <Text>Elevation 0 - 100</Text>
  </Card>
</div>
```

### Card Content

The Card component includes sub-components for arranging content in repeatable manner. **NOTE**: These features are not design complete and are subject to change in future releases.

```
const menuOptions = [
  { value: 'I\'m a test value!', id: 0 },
  { value: 'Me too!', id: 1 },
  { value: 'Me three...', id: 2 },
];

const actions = [
  <Card.ActionsMenu key="menu-2" menuToggleIcon="bar-small" menuOptions={ menuOptions } />,
  <Card.ActionsMenu key="menu-1" menuOptions={ menuOptions } />,
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
