```
const numParagraphs = 20;
const paragraphs = [];

for (var i = 0; i < numParagraphs; i++) {
  paragraphs.push(<p>Hello world</p>);
}

<div style={ { height: '400px' } }>
  <Accordion title="I'm a fun Accordion" autoOpen>
    <Accordion.Item key="elem1" title="First element">
      <div>Hello, world! From the first element.</div>
    </Accordion.Item>
    <Accordion.Item key="elem2" title="Second element">
      <div>Hello, world! From the second element. Here's a bunch of paragraphs.</div>
      { paragraphs }
    </Accordion.Item>
    <Accordion.Item key="elem3" title="Third element">
      <div>Hello, world! From the third element.</div>
    </Accordion.Item>
  </Accordion>
</div>
```

`Accordion` with Icons:

```
<Accordion title="Accordion Title with Icon" icon="donut">
  <Accordion.Item title="First Accordion Item" icon="donut" tooltip="Bar is a component type" />
  <Accordion.Item title="Second Accordion Item" icon="donut" />
</Accordion>
```
