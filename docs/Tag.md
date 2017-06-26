```
<Card>
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
  onClick={ () => { console.log('Tag clicked!'); } }
  onRemove={ () => { console.log('Tag removed!') } }
  removable>Odin</Tag>
<Tag
  onClick={ () => { console.log('Tag clicked!'); } }
  onRemove={ () => { console.log('Tag removed!') } }
  removable>Yggdrasil</Tag>
<Tag
  onClick={ () => { console.log('Tag clicked!'); } }
  onRemove={ () => { console.log('Tag removed!') } }
  removable>Valhalla</Tag>
<Tag
  onClick={ () => { console.log('Tag clicked!'); } }
  onRemove={ () => { console.log('Tag removed!') } }
  removable>Valkyry</Tag>
<Tag
  onClick={ () => { console.log('Tag clicked!'); } }
  onRemove={ () => { console.log('Tag removed!') } }
  removable>Frigg</Tag>
<Tag
  onClick={ () => { console.log('Tag clicked!'); } }
  onRemove={ () => { console.log('Tag removed!') } }
  removable>Freyja</Tag>
</Card>
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
