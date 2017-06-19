```
<div>
  <Toggle
    left="option 1"
    right="option 2"
    onChange={ () => { console.log('fist one changed') } }
  />
  <Toggle
    left="option 3"
    right="option 4"
    onChange={ () => { console.log('second one changed') } }
  />
</div>
```

Disabled toggle:
```
<Toggle
  left="disabled"
  right="also disabled"
  disabled
  onChange={ () => { console.log('impossible!') } }
/>
```
