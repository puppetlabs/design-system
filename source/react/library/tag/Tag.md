Tags:

```
<div>
  <Tag
    onRemove={ () => { console.log('Tag removed!') } }
  >
    I'm a default tag!
  </Tag>
  <Tag
    onClick={ () => { console.log('Tag clicked!') } }
    onRemove={ () => { console.log('Tag removed!') } }
  >
    I'm a clickable tag!
  </Tag>
  <Tag
    disabled     
  >
    I'm a disabled tag!
  </Tag>
</div>
```
