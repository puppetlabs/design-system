```
<div>
  <Tag
    onClick={ () => { console.log('Tag clicked!'); } }
    onRemove={ () => { console.log('Tag removed!') } }
    removable>I'm a happpy tag!</Tag>
  <Tag
    onClick={ () => { console.log('Tag clicked!'); } }
    onRemove={ () => { console.log('Tag removed!') } }
    removable>Another tag</Tag>
  <Tag
    onClick={ () => { console.log('Tag clicked!'); } }
    onRemove={ () => { console.log('Tag removed!') } }
    removable>Thor</Tag>
  <Tag
    onClick={ () => { console.log('Tag clicked!'); } }
    onRemove={ () => { console.log('Tag removed!') } }
    removable>Loki</Tag>
  <Tag
    round
    onClick={ () => { console.log('Tag clicked!'); } }
    onRemove={ () => { console.log('Tag removed!') } }
    removable>We're</Tag>
  <Tag
    round
    onClick={ () => { console.log('Tag clicked!'); } }
    onRemove={ () => { console.log('Tag removed!') } }
    removable>rounded</Tag>
  <Tag
    round
    onClick={ () => { console.log('Tag clicked!'); } }
    onRemove={ () => { console.log('Tag removed!') } }
    removable>tags</Tag>
  <Tag
    primary
    onClick={ () => { console.log('Tag clicked!'); } }
    onRemove={ () => { console.log('Tag removed!') } }
    removable>We're</Tag>
  <Tag
    primary
    onClick={ () => { console.log('Tag clicked!'); } }
    onRemove={ () => { console.log('Tag removed!') } }
    removable>primary</Tag>
  <Tag
    primary
    onClick={ () => { console.log('Tag clicked!'); } }
    onRemove={ () => { console.log('Tag removed!') } }
    removable>tags</Tag>
</div>
```

Clickable, removable tag:
```
<Tag
  onClick={ () => { console.log('Tag clicked!'); } }
  onRemove={ () => { console.log('Tag removed!') } }
  removable
  block
>
  I'm a happy removable tag!
</Tag>
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
