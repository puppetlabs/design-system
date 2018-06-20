```
<Card>
  <CardHeader title="I'm a happy card!" subtitle="I'm a happy subtitle" />
  <CardSection>I am a section for card content</CardSection>
</Card>
```

Selectable `Card`:
```
<Card onClick={() => {}}>
  <CardHeader title="I'm selectable!" subtitle="I am a selectable subtitle!" />
</Card>
```

Card with two sections inside:
```
<Card>
  <CardSection>
    I am a card section
  </CardSection>
  <CardSection>
    I am a also card section
  </CardSection>
</Card>
```

Card with description & title
```
<Card>
  <CardHeader title="I am a title" description="I am a card description" />
  <CardSection>I am the content of the card</CardSection>
</Card>
```
Card with action dropdown
```
const menuOptions = [
  { value: 'I\'m a test value!', id: 0 },
  { value: 'Me too!', id: 1 },
  { value: 'Me three...', id: 2 },
];

const actions = [<CardActionsMenu key="menu-1" menuOptions={ menuOptions } />];
<Card>
  <CardHeader title="I am a title" actions={ actions } />
</Card>
```
Card with action dropdown and no title
```
const menuOptions = [
  { value: 'I\'m a test value!', id: 0 },
  { value: 'Me too!', id: 1 },
  { value: 'Me three...', id: 2 },
];

const actions = [<CardActionsMenu key="menu-1" menuOptions={ menuOptions } />];
<Card>
  <CardHeader actions={ actions } />
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
  <CardActionsMenu key="menu-2" menuToggleIcon="bar-small" menuOptions={ menuOptions } />,
  <CardActionsMenu key="menu-1" menuOptions={ menuOptions } />,
];

<Card>
  <CardHeader title="I am a title" actions={ actions } />
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
  <CardActionsMenu key="menu-2" menuToggleIcon="bar-small" menuOptions={ menuOptions } />,
  <CardActionsMenu key="menu-1" menuOptions={ menuOptions } />,
];

<Card>
  <CardHeader title="I am a really really really really really really really really really really really really title" actions={ actions } />
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
  <CardActionsSearch key="menu-1" onSearch={ (value) => { console.log(value) }  } />,
  <CardActionsMenu key="menu-2" menuOptions={ menuOptions } />,
];

<Card>
  <CardHeader title="I am a title" actions={ actions } />
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
  <CardActionsMenu
    key="menu-1"
    message="There is an error in this card"
    menuOptions={ menuOptions }
  />,
];

<Card>
  <CardHeader title="I am a title" actions={ actions } />
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
  <CardActionsMenu key="menu-1" menuOptions={ menuOptions } />,
];

<Card>
  <CardHeader description="I am a card description" actions={ actions } />
</Card>
```
