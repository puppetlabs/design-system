```
<div>
  <Tag
    removable>I'm a default tag</Tag>
  <Tag
    round
    removable>I'm a round tag</Tag>
  <Tag
    bold
    removable>I'm a bold tag</Tag>
  <Tag
    primary
    removable>I'm a primary tag</Tag>
  <Tag
    secondary
    removable>I'm a secondary tag</Tag>
</div>
```

Clickable, removable tag:

```
<div>
  <Tag
    onClick={ () => { console.log('Tag clicked!') } }
    removable
  >
    I'm a clickable tag!
  </Tag>
  <Tag
    onRemove={ () => { console.log('Tag removed!') } }
    removable
  >
    I'm a removable tag!
  </Tag>
  <Tag
    onClick={ () => { console.log('Tag clicked!') } }
    onRemove={ () => { console.log('Tag removed!') } }
    removable
  >
    I'm a clickable & removable tag!
  </Tag>
</div>
```

Tag with a tooltip:

```
<Tag block tooltip>I'm a happy tag with a tooltip!</Tag>
```

Selected Tag:

```
<Tag block selected>I'm a happy selected Tag!</Tag>
```

Tag sizes:

```
<Tag block size="tiny">I'm a tiny tag!</Tag>
```
