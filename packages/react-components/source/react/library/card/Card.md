## Overview

Cards provide flexible containers for related pieces of UI content. There are primary and secondary variants available at multiple elevations. Each may become 'selectable' for use in a selectable list and can contain standardized card content such as a title, an action, or selection of actions.

### Primary Cards

```jsx
import Heading from '../heading';
import Text from '../text';

const cardExampleStyle = {
  width: 150,
  minHeight: 100,
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 12,
};

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
</div>;
```

### Secondary Cards

```jsx
import Heading from '../heading';
import Text from '../text';

const cardExampleStyle = {
  width: 150,
  minHeight: 100,
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 12,
};

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
</div>;
```

### Selectable Cards

Cards are often used on grids where the content in each card is selectable, perhaps controlling the content of a sidebar or other page area.

```jsx
import Heading from '../heading';

initialState = {
  selected: null,
};

const cardExampleStyle = {
  width: 150,
  minHeight: 100,
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 12,
};

<div style={{ display: 'flex' }}>
  <Card
    selectable
    selected={state.selected === 'a'}
    onClick={() => setState({ selected: 'a' })}
    style={cardExampleStyle}
  >
    <Heading as="h3">A</Heading>
  </Card>
  <Card
    selectable
    selected={state.selected === 'b'}
    onClick={() => setState({ selected: 'b' })}
    style={cardExampleStyle}
  >
    <Heading as="h3">B</Heading>
  </Card>
  <Card
    selectable
    selected={state.selected === 'c'}
    onClick={() => setState({ selected: 'c' })}
    style={cardExampleStyle}
  >
    <Heading as="h3">C</Heading>
  </Card>
</div>;
```

### Card Content

Card content is arbitrary as determined by the needs of the application. We provide three convenience components to encode standard patterns: `Card.Title`, which provides a consistently applied card header, `Card.ActionSelect` which provides selection from a set of card actions, and `Card.Action` which provides access to a single card action, pre-styled in a consistent manner.

#### Card with action select

```jsx
const cardActions = [
  {
    label: 'Card Action 1',
    id: 0,
    onClick: () => console.log('You did thing 1'),
  },
  {
    label: 'Card Action 2',
    id: 1,
    onClick: () => console.log('You did thing 2'),
  },
  {
    label: 'Card Action 3',
    id: 2,
    onClick: () => console.log('You did thing 3'),
  },
];

<Card>
  <Card.Title>Title</Card.Title>
  <Card.ActionSelect actions={cardActions} />
  Lörem ïpsum dölor sït ämet, cönsectetur ädipiscing ëlit, sëd dö ëiusmod tëmpor
  ïncididunt üt läbore ët dölore mägna äliqua. Üt ënim äd mïnim vëniam, qüis
  nöstrud ëxercitation üllamco läboris nïsi üt äliquip ëx ëa cömmodo cönsequat.
  Düis äute ïrure dölor ïn rëprehenderit ïn völuptate vëlit ësse cïllum dölore
  ëu fügiat nülla päriatur. Ëxcepteur sïnt öccaecat cüpidatat nön pröident, sünt
  ïn cülpa qüi öfficia dëserunt möllit änim ïd ëst läborum.
</Card>;
```

#### Card with single action

```jsx
<Card>
  <Card.Title>Title</Card.Title>
  <Card.Action icon="pencil" onClick={() => console.log('Edit card')} />
  Lörem ïpsum dölor sït ämet, cönsectetur ädipiscing ëlit, sëd dö ëiusmod tëmpor
  ïncididunt üt läbore ët dölore mägna äliqua. Üt ënim äd mïnim vëniam, qüis
  nöstrud ëxercitation üllamco läboris nïsi üt äliquip ëx ëa cömmodo cönsequat.
</Card>
```
