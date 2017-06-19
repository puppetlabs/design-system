```
<Tag block>I'm a happpy tag!</Tag>
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
