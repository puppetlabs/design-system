```
<Card
  title="I'm a happy card!"
  subtitle="I'm a happy subtitle!"
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
