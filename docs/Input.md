Multiline `Input`:
```
<Input multiline />
```

`Input` with value:
```
<Input value="I'm a happy input with a value!" />
```

`Input` with placeholder:
```
<Input placeholder="I'm a happy input with a placeholder!" />
```

Disabled `Input`:
```
<Input
  disabled
  placeholder="I am disabled"
/>
```

Small `Input`:
```
<Input
  size="small"
  placeholder="I'm a happy small Input!"
/>
```

Large `Input`:
```
<Input size="large" placeholder="I'm a large input" />
```

Simple `Input`:
```
<Input simple placeholder="I'm a simple input" />
```

Simple `Input` with icon:
```
<Input simple icon />
```

Number `Input`:
```
<Input
  type="number"
  value={ state.numberVal }
  onChange={ (e) => { setState({ numberVal: parseInt(e.target.value) }) } }
/>
```
