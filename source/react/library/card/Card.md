```
<Card>
  <CardTitle title="I'm a happy card!" subtitle="I'm a happy subtitle" />
</Card>
```

Selectable `Card`:
```
<Card className="rc-card-selectable">
  <CardTitle title="I'm selectable!" subtitle="I am a selectable subtitle!" />
</Card>
```

Removable `Card`:
```
<Card>
  <CardTitle title="I'm an h1 inside the card" />
  <CardActions
    onRemove={ () => alert('Card removed!') }
  />
</Card>
```

Card with two sections inside:
```
<Card>
  <CardSection>
    <h2>Hello!</h2>
  </CardSection>
  <CardSection>
    <h3>Hello from here too!</h3>
  </CardSection>
</Card>
```

Card with an action:
```
<Card>
  <CardTitle title="Card Title" />
  <CardActions>
    <ButtonGroup collapsed>
      <Button size="tiny" secondary>Line</Button>
      <Button size="tiny">Bar</Button>
      <Button size="tiny">Area</Button>
    </ButtonGroup>
  </CardActions>
</Card>
```
Card with search
```
<Card>
  <CardTitle title="I am a title" />
  <CardSearch />
</Card>
```
Card with action dropdown
```
const menuOptions = [
  { value: 'I\'m a test value!', id: 0 },
  { value: 'Me too!', id: 1 },
  { value: 'Me three...', id: 2 },
];
<Card>
  <CardTitle title="I am a title" />
  <CardActions menuOptions={ menuOptions } />
</Card>
```
