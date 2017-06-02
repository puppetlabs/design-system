```
<Card
  title="I'm a happy card!"
  subtitle="I'm a happy subtitle!"
/>
```

`Card` Sizes:
```
<Card
  title="I'm a extra-small card!"
  subtitle="I'm a extra-small subtitle!"
  size="xs"
/>
```
```
<Card
  title="I'm a small card!"
  subtitle="I'm a small subtitle!"
  size="small"
/>
```
```
<Card
  title="I'm a large card!"
  subtitle="I'm a large subtitle!"
  size="large"
/>
```

Selectable `Card`:
```
<Card
  title="I am selectable!"
  subtitle="I am a selectable subtitle!"
  className="rc-card-selectable"
/>
```
Selected `Card`:
```
<Card
  selected
  title="I'm a happy selected card!"
  subtitle="I'm a happy subtitle!"
  className="rc-card-selectable"
/>
```

Removable `Card`:
```
<Card
  onRemove={ () => alert('Card removed!') }
  title="I'm a happy removable card!"
  subtitle="I'm a happy subtitle!"
/>
```
