```
<Card>
  <Card.Header title="I'm a happy card!" subtitle="I'm a happy subtitle" />
  <Card.Section>I am a section for card content</Card.Section>
</Card>
```

Selectable `Card`:

```
<Card onClick={() => {}}>
  <Card.Header title="I'm selectable!" subtitle="I am a selectable subtitle!" />
</Card>
```

Card with two sections inside:

```
<Card>
  <Card.Section>
    I am a card section
  </Card.Section>
  <Card.Section>
    I am a also card section
  </Card.Section>
</Card>
```

Card with description & title

```
<Card>
  <Card.Header title="I am a title" description="I am a card description" />
  <Card.Section>I am the content of the card</Card.Section>
</Card>
```

Card with action dropdown

```
const menuOptions = [
  { value: 'I\'m a test value!', id: 0 },
  { value: 'Me too!', id: 1 },
  { value: 'Me three...', id: 2 },
];

const actions = [<Card.ActionsMenu key="menu-1" menuOptions={ menuOptions } />];
<Card>
  <Card.Header title="I am a title" actions={ actions } />
</Card>
```

Card with action dropdown and no title

```
const menuOptions = [
  { value: 'I\'m a test value!', id: 0 },
  { value: 'Me too!', id: 1 },
  { value: 'Me three...', id: 2 },
];

const actions = [<Card.ActionsMenu key="menu-1" menuOptions={ menuOptions } />];
<Card>
  <Card.Header actions={ actions } />
</Card>
```

Card with two action dropdowns

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
  <Card.Header title="I am a title" actions={ actions } />
</Card>
```

Card with two action dropdowns and a really long title

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
  <Card.Header title="I am a really really really really really really really really really really really really long title" actions={ actions } />
</Card>
```

Card with two types of actions, menu and search

```
const menuOptions = [
  { value: 'I\'m a test value!', id: 0 },
  { value: 'Me too!', id: 1 },
  { value: 'Me three...', id: 2 },
];

const actions = [
  <Card.ActionsSearch key="menu-1" onSearch={ (value) => { console.log(value) }  } />,
  <Card.ActionsMenu key="menu-2" menuOptions={ menuOptions } />,
];

<Card>
  <Card.Header title="I am a title" actions={ actions } />
</Card>
```

Card with action menu in error state

```
const menuOptions = [
  { value: 'I\'m a test value!', id: 0 },
  { value: 'Me too!', id: 1 },
  { value: 'Me three...', id: 2 },
];

const actions = [
  <Card.ActionsMenu
    key="menu-1"
    message="There is an error in this card"
    menuOptions={ menuOptions }
  />,
];

<Card>
  <Card.Header title="I am a title" actions={ actions } />
</Card>
```

Card with no title, subtitle, or controls, but with actions and description

```
const menuOptions = [
  { value: 'I\'m a test value!', id: 0 },
  { value: 'Me too!', id: 1 },
  { value: 'Me three...', id: 2 },
];

const actions = [
  <Card.ActionsMenu key="menu-1" menuOptions={ menuOptions } />,
];

<Card>
  <Card.Header description="I am a card description" actions={ actions } />
</Card>
```
